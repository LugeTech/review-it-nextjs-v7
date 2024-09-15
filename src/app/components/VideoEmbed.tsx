import React, { useState, useEffect, useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

type VideoType = 'youtube' | 'tiktok' | 'unknown';

interface VideoEmbedProps {
  url: string;
}

interface EmbedCodeResult {
  error: string;
  embedCode: string;
  thumbnailUrl: string;
  videoType: VideoType;
}

const VideoEmbed: React.FC<VideoEmbedProps> = React.memo(({ url }) => {
  const [embedCode, setEmbedCode] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [videoType, setVideoType] = useState<VideoType>('unknown');
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  const getVideoType = useCallback((url: string): VideoType => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('tiktok.com')) return 'tiktok';
    return 'unknown';
  }, []);

  const getYouTubeEmbedCode = useCallback((videoId: string): string => {
    const frame = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    return frame;
  }, []);

  const getTikTokEmbedCode = useCallback(async (url: string): Promise<{ embedCode: string, thumbnailUrl: string }> => {
    try {
      if (url.includes('vm.tiktok.com')) {
        setError('TikTok mobile link not supported please open this link in your browser and use the expanded link');
        // throw new Error('TikTok mobile link not supported please open this link in your browser and use the expanded link');
        return { embedCode: '', thumbnailUrl: '' };
        // const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
        // url = response.url; // This will be the full URL after redirection
      }

      const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { embedCode: data.html, thumbnailUrl: data.thumbnail_url };
    } catch (error) {
      // console.error('Error fetching TikTok embed code:', error);
      // setError(error as string);
      throw new Error('Failed to fetch TikTok embed code');
    }
  }, []);

  const generateEmbedCode = useCallback(async (url: string): Promise<EmbedCodeResult> => {
    if (!url) {
      return { error: '', embedCode: '', thumbnailUrl: '', videoType: 'unknown' };
    }

    const type = getVideoType(url);

    try {
      switch (type) {
        case 'youtube': {
          const youtubeId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
          if (!youtubeId) {
            return { error: 'Invalid YouTube URL', embedCode: '', thumbnailUrl: '', videoType: type };
          }
          return { error: '', embedCode: getYouTubeEmbedCode(youtubeId), thumbnailUrl: '', videoType: type };
        }
        case 'tiktok': {
          const { embedCode, thumbnailUrl } = await getTikTokEmbedCode(url);
          if (!embedCode && url.includes('vm.tiktok.com')) {
            return { error: 'mobile tik tok link not supported, please open this link in your browser and use the expanded link', embedCode: '', thumbnailUrl: '', videoType: type };
          } else if (!embedCode) {
            return { error: 'Invalid TikTok URL', embedCode: '', thumbnailUrl: '', videoType: type };
          }
          return { error: '', embedCode, thumbnailUrl, videoType: type };
        }
        default:
          return { error: 'Unsupported video platform. Please use YouTube, or TikTok.', embedCode: '', thumbnailUrl: '', videoType: 'unknown' };
      }
    } catch (error) {
      return { error: `Error generating embed code: ${error instanceof Error ? error.message : String(error)}`, embedCode: '', thumbnailUrl: '', videoType: type };
    }
  }, [getVideoType, getYouTubeEmbedCode, getTikTokEmbedCode]);

  useEffect(() => {
    generateEmbedCode(url).then((result) => {
      setError(result.error);
      setEmbedCode(result.embedCode);
      setThumbnailUrl(result.thumbnailUrl);
      setVideoType(result.videoType);
    });
  }, [url, generateEmbedCode]);

  useEffect(() => {
    if (videoType === 'tiktok' && isVideoLoaded) {
      const script = document.createElement('script');
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [videoType, embedCode, isVideoLoaded]);

  return (
    <div className="w-full sm:w-80  mx-auto mt-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {thumbnailUrl && !isVideoLoaded && (
        <div className="relative cursor-pointer" onClick={() => setIsVideoLoaded(true)}>
          <Image src={thumbnailUrl} alt="TikTok Thumbnail" height={200} width={150} className="w-full h-auto" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button className="text-white text-2xl">Play</button>
          </div>
        </div>
      )}
      {embedCode && (
        <div
          className=" w-full h-full"
          dangerouslySetInnerHTML={{ __html: embedCode }}
        />
      )}
    </div>
  );
});

VideoEmbed.displayName = 'VideoEmbed';

export default VideoEmbed;
