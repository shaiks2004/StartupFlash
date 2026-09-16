<?php

declare(strict_types=1);

const STARTUPFLASH_SITE_URL = 'https://thestartupflash.in';
const STARTUPFLASH_API_URL = 'https://cms.thestartupflash.in/wp-json/wp/v2/posts';
const STARTUPFLASH_CACHE_TTL = 300;

function startupflash_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function startupflash_text($value): string
{
    $text = is_string($value) ? strip_tags($value) : '';
    return trim(html_entity_decode(preg_replace('/\s+/', ' ', $text), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
}

function startupflash_image_url(array $post): string
{
    $media = $post['_embedded']['wp:featuredmedia'][0] ?? [];
    $sizes = $media['media_details']['sizes'] ?? [];
    $image = $sizes['medium_large']['source_url'] ?? ($media['source_url'] ?? '');

    if (!$image && preg_match('/<img[^>]+src=["\']([^"\']+)["\']/i', $post['content']['rendered'] ?? '', $matches)) {
        $image = $matches[1];
    }

    $parts = parse_url($image);
    if (($parts['scheme'] ?? '') !== 'https' || empty($parts['host'])) {
        return '';
    }

    return $image;
}

function startupflash_fetch_post(string $slug): ?array
{
    $cacheFile = sys_get_temp_dir() . '/startupflash-article-' . sha1($slug) . '.json';
    if (is_file($cacheFile) && (time() - filemtime($cacheFile)) < STARTUPFLASH_CACHE_TTL) {
        $cached = json_decode((string) file_get_contents($cacheFile), true);
        if (is_array($cached)) {
            return $cached;
        }
    }

    $url = STARTUPFLASH_API_URL . '?slug=' . rawurlencode($slug) . '&_embed=1';
    $body = false;

    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_CONNECTTIMEOUT => 3,
            CURLOPT_TIMEOUT => 6,
            CURLOPT_HTTPHEADER => ['Accept: application/json'],
        ]);
        $body = curl_exec($curl);
        curl_close($curl);
    } else {
        $context = stream_context_create([
            'http' => [
                'timeout' => 6,
                'header' => "Accept: application/json\r\n",
            ],
        ]);
        $body = @file_get_contents($url, false, $context);
    }

    $posts = is_string($body) ? json_decode($body, true) : null;
    $post = is_array($posts) && isset($posts[0]) && is_array($posts[0]) ? $posts[0] : null;

    if ($post) {
        @file_put_contents($cacheFile, json_encode($post, JSON_UNESCAPED_SLASHES));
    }

    return $post;
}

function startupflash_shell(): string
{
    $index = __DIR__ . '/index.html';
    return is_file($index) ? (string) file_get_contents($index) : '';
}

$slug = (string) ($_GET['slug'] ?? '');
if (!preg_match('/^[A-Za-z0-9-]+$/', $slug)) {
    echo startupflash_shell();
    exit;
}

$post = startupflash_fetch_post($slug);
if (!$post) {
    echo startupflash_shell();
    exit;
}

$title = startupflash_text($post['title']['rendered'] ?? 'StartupFlash article');
$description = startupflash_text($post['excerpt']['rendered'] ?? 'StartupFlash startup and business news.');
$image = startupflash_image_url($post);
$articleUrl = STARTUPFLASH_SITE_URL . '/article/' . rawurlencode($slug);
$author = startupflash_text($post['_embedded']['author'][0]['name'] ?? 'StartupFlash');
$published = startupflash_text($post['date'] ?? '');
$modified = startupflash_text($post['modified'] ?? $post['date'] ?? '');
$escapedTitle = startupflash_escape($title . ' | StartupFlash');
$escapedDescription = startupflash_escape($description);
$escapedImage = startupflash_escape($image);
$escapedUrl = startupflash_escape($articleUrl);
$escapedAuthor = startupflash_escape($author);
$jsonLd = json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'NewsArticle',
    'headline' => $title,
    'description' => $description,
    'url' => $articleUrl,
    'image' => $image ? [$image] : [],
    'datePublished' => $post['date'] ?? null,
    'dateModified' => $post['modified'] ?? ($post['date'] ?? null),
    'author' => ['@type' => 'Person', 'name' => $author],
    'publisher' => ['@type' => 'Organization', 'name' => 'StartupFlash'],
], JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

$metadata = "\n" .
    '<title>' . $escapedTitle . '</title>' . "\n" .
    '<meta name="description" content="' . $escapedDescription . '">' . "\n" .
    '<meta property="og:type" content="article">' . "\n" .
    '<meta property="og:site_name" content="StartupFlash">' . "\n" .
    '<meta property="og:title" content="' . $escapedTitle . '">' . "\n" .
    '<meta property="og:description" content="' . $escapedDescription . '">' . "\n" .
    ($image ? '<meta property="og:image" content="' . $escapedImage . '">' . "\n" : '') .
    '<meta property="og:url" content="' . $escapedUrl . '">' . "\n" .
    '<meta name="twitter:card" content="summary_large_image">' . "\n" .
    '<meta name="twitter:title" content="' . $escapedTitle . '">' . "\n" .
    '<meta name="twitter:description" content="' . $escapedDescription . '">' . "\n" .
    ($image ? '<meta name="twitter:image" content="' . $escapedImage . '">' . "\n" : '') .
    '<link rel="canonical" href="' . $escapedUrl . '">' . "\n" .
    ($published ? '<meta property="article:published_time" content="' . startupflash_escape($published) . '">' . "\n" : '') .
    ($modified ? '<meta property="article:modified_time" content="' . startupflash_escape($modified) . '">' . "\n" : '') .
    '<meta property="article:author" content="' . $escapedAuthor . '">' . "\n" .
    '<script type="application/ld+json">' . $jsonLd . '</script>' . "\n";

$html = startupflash_shell();
$updated = preg_replace('/<\/head>/i', $metadata . '</head>', $html, 1);
header('Content-Type: text/html; charset=UTF-8');
echo $updated !== null ? $updated : $html;
