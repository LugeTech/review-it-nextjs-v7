import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type VideoType = 'youtube' | 'instagram' | 'tiktok' | 'unknown';

interface VideoEmbedProps {
  url: string;
}

interface EmbedCodeResult {
  error: string;
  embedCode: string;
  videoType: VideoType;
}

const VideoEmbed: React.FC<VideoEmbedProps> = React.memo(({ url }) => {
  const [embedCode, setEmbedCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [videoType, setVideoType] = useState<VideoType>('unknown');

  const getVideoType = useCallback((url: string): VideoType => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('tiktok.com')) return 'tiktok';
    return 'unknown';
  }, []);

  const getYouTubeEmbedCode = useCallback((videoId: string): string => {
    return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
  }, []);

  const getInstagramEmbedCode = useCallback((postId: string): string => {
    return `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${postId}/" style="max-width:100%; width:100%;"></blockquote> <script async src="//www.instagram.com/embed.js"></script>`;
  }, []);

  const getTikTokEmbedCode = useCallback((videoId: string): string => {
    return `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/video/${videoId}" data-video-id="${videoId}" style="max-width: 100%; width:100%;"> <script async src="https://www.tiktok.com/embed.js"></script></blockquote>`;
  }, []);

  const generateEmbedCode = useMemo((): EmbedCodeResult => {
    if (!url) {
      return { error: 'Please provide a valid URL', embedCode: '', videoType: 'unknown' };
    }

    const type = getVideoType(url);

    switch (type) {
      case 'youtube':
        const youtubeId = url.split('v=')[1] || url.split('/').pop();
        return youtubeId
          ? { error: '', embedCode: getYouTubeEmbedCode(youtubeId), videoType: type }
          : { error: 'Invalid YouTube URL', embedCode: '', videoType: type };
      case 'instagram':
        const instagramId = url.split('/p/')[1]?.split('/')[0];
        return instagramId
          ? { error: '', embedCode: getInstagramEmbedCode(instagramId), videoType: type }
          : { error: 'Invalid Instagram URL', embedCode: '', videoType: type };
      case 'tiktok':
        const tiktokId = url.split('/video/')[1];
        return tiktokId
          ? { error: '', embedCode: getTikTokEmbedCode(tiktokId), videoType: type }
          : { error: 'Invalid TikTok URL', embedCode: '', videoType: type };
      default:
        return { error: 'Unsupported video platform. Please use YouTube, Instagram, or TikTok.', embedCode: '', videoType: 'unknown' };
    }
  }, [url, getVideoType, getYouTubeEmbedCode, getInstagramEmbedCode, getTikTokEmbedCode]);

  useEffect(() => {
    setError(generateEmbedCode.error);
    setEmbedCode(generateEmbedCode.embedCode);
    setVideoType(generateEmbedCode.videoType);
  }, [generateEmbedCode]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-4"> {/* Increased max-width */}
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {embedCode && (
        <div className={`bg-gray-100 rounded overflow-hidden ${videoType === 'youtube' ? 'aspect-video' : ''}`}>
          <div
            className={`${videoType === 'youtube' ? 'w-full h-full' : 'w-full'}`}
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
        </div>
      )}
    </div>
  );
});

VideoEmbed.displayName = 'VideoEmbed';

export default VideoEmbed;
