import { useState } from 'react';
import { ComponentPage } from '../../components/layout/ComponentPage';
import { ExampleSection } from '../../components/ui/ExampleSection';
import { PhotoGallery, type Photo } from '../../../photo-gallery';

const tableOfContents = [
  { id: 'layouts', title: 'Layouts', level: 1 },
  { id: 'sizes', title: 'Sizes', level: 1 },
  { id: 'infinite-scroll', title: 'Infinite Scroll', level: 1 },
  { id: 'interaction-states', title: 'Interaction States', level: 1 },
  { id: 'customization', title: 'Customization', level: 1 },
];

// Sample photos for examples
const samplePhotos: Photo[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=200&fit=crop',
    alt: 'Mountain landscape',
    caption: 'Mountain Adventure',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop',
    alt: 'Forest path',
    caption: 'Forest Walk',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=250&fit=crop',
    alt: 'Ocean view',
    caption: 'Ocean Serenity',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=200&fit=crop',
    alt: 'Desert sunset',
    caption: 'Desert Sunset',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=280&fit=crop',
    alt: 'City skyline',
    caption: 'Urban Lights',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=220&fit=crop',
    alt: 'Starry night',
    caption: 'Starry Night',
  },
];

const horizontalPhotos: Photo[] = [
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=300&fit=crop',
    alt: 'Tropical beach',
    caption: 'Tropical Paradise',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=300&h=300&fit=crop',
    alt: 'Autumn forest',
    caption: 'Autumn Colors',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&h=300&fit=crop',
    alt: 'Misty lake',
    caption: 'Misty Morning',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
    alt: 'Snow peaks',
    caption: 'Snow Peaks',
  },
];

const masonryPhotos: Photo[] = [
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=250&h=350&fit=crop',
    alt: 'Tall mountain',
    caption: 'Tall Mountain',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=250&h=200&fit=crop',
    alt: 'Wide forest',
    caption: 'Wide Forest',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=400&fit=crop',
    alt: 'Vertical ocean',
    caption: 'Ocean Depth',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=250&h=180&fit=crop',
    alt: 'Short desert',
    caption: 'Desert Vista',
  },
];

export function PhotoGalleryPage() {
  const [infinitePhotos, setInfinitePhotos] = useState<Photo[]>(samplePhotos.slice(0, 4));

  const loadMorePhotos = async (offset: number, limit: number): Promise<Photo[]> => {
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate more sample photos
    const newPhotos: Photo[] = Array.from({ length: limit }, (_, i) => ({
      id: offset + i + 100,
      src: `https://images.unsplash.com/photo-${1518837695005 + (offset + i)}?w=300&h=${200 + (i * 20)}&fit=crop`,
      alt: `Landscape ${offset + i + 1}`,
      caption: `Photo ${offset + i + 1}`,
    }));

    return newPhotos;
  };

  return (
    <ComponentPage
      title='PhotoGallery'
      description='A flexible photo gallery component with infinite scrolling, multiple layouts, and responsive design. Perfect for showcasing image collections with smooth loading and navigation.'
      tableOfContents={tableOfContents}
    >
      <ExampleSection 
        title='Layouts'
        description='Multiple layout options to display photos in different arrangements.'
        id='layouts'
      >
        <div className='space-y-8'>
          {/* Grid Layout */}
          <div>
            <h4 className='text-lg font-medium text-white mb-3'>Grid Layout</h4>
            <p className='text-gray-400 mb-4'>
              Displays photos in a responsive grid that adapts from 1 column on mobile to 4 columns on desktop.
            </p>
            <PhotoGallery
              layout='grid'
              size='md'
              containerHeight='300px'
              initialPhotos={samplePhotos}
              onPhotoClick={(photo, index) => console.log('Clicked:', photo.caption, 'at index:', index)}
            />
          </div>

          {/* Horizontal Layout */}
          <div>
            <h4 className='text-lg font-medium text-white mb-3'>Horizontal Scrolling</h4>
            <p className='text-gray-400 mb-4'>
              Photos arranged in a horizontally scrollable row, perfect for mobile-friendly galleries.
            </p>
            <PhotoGallery
              layout='horizontal'
              size='lg'
              containerHeight='250px'
              initialPhotos={horizontalPhotos}
              onPhotoClick={(photo, index) => alert(`Clicked ${photo.caption}`)}
            />
          </div>

          {/* Masonry Layout */}
          <div>
            <h4 className='text-lg font-medium text-white mb-3'>Masonry Layout</h4>
            <p className='text-gray-400 mb-4'>
              Pinterest-style layout that handles photos of different aspect ratios elegantly.
            </p>
            <PhotoGallery
              layout='masonry'
              size='sm'
              containerHeight='400px'
              initialPhotos={masonryPhotos}
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Sizes'
        description='Different size variants to control photo dimensions and spacing.'
        id='sizes'
      >
        <div className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <h5 className='font-medium text-gray-300 mb-2'>Small (128px)</h5>
              <PhotoGallery
                layout='grid'
                size='sm'
                containerHeight='200px'
                initialPhotos={samplePhotos.slice(0, 4)}
              />
            </div>
            <div>
              <h5 className='font-medium text-gray-300 mb-2'>Medium (192px)</h5>
              <PhotoGallery
                layout='grid'
                size='md'
                containerHeight='200px'
                initialPhotos={samplePhotos.slice(0, 4)}
              />
            </div>
            <div>
              <h5 className='font-medium text-gray-300 mb-2'>Large (256px)</h5>
              <PhotoGallery
                layout='grid'
                size='lg'
                containerHeight='200px'
                initialPhotos={samplePhotos.slice(0, 4)}
              />
            </div>
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Infinite Scroll'
        description='Automatically loads more photos as users scroll, with customizable loading behavior.'
        id='infinite-scroll'
      >
        <div className='space-y-4'>
          <p className='text-gray-400'>
            This example demonstrates infinite scrolling. Scroll to the bottom to load more photos automatically.
          </p>
          <PhotoGallery
            layout='grid'
            size='md'
            containerHeight='400px'
            initialPhotos={infinitePhotos}
            onLoadMore={loadMorePhotos}
            pageSize={4}
            threshold={100}
            enableInfiniteScroll={true}
          />
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Interaction States'
        description='Various states and interactions the gallery can display.'
        id='interaction-states'
      >
        <div className='space-y-6'>
          {/* Empty State */}
          <div>
            <h4 className='text-lg font-medium text-white mb-3'>Empty State</h4>
            <p className='text-gray-400 mb-4'>
              When no photos are available, the gallery shows a helpful empty state message.
            </p>
            <PhotoGallery
              layout='grid'
              size='md'
              containerHeight='150px'
              initialPhotos={[]}
            />
          </div>

          {/* Custom Empty Message */}
          <div>
            <h4 className='text-lg font-medium text-white mb-3'>Custom Empty Message</h4>
            <p className='text-gray-400 mb-4'>
              You can customize the empty state with your own content.
            </p>
            <PhotoGallery
              layout='grid'
              size='md'
              containerHeight='150px'
              initialPhotos={[]}
              emptyMessage={
                <div className="text-center p-8">
                  <div className="text-blue-400 text-lg font-medium mb-2">
                    🖼️ No photos yet
                  </div>
                  <div className="text-gray-400">
                    Upload some photos to get started!
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </ExampleSection>

      <ExampleSection 
        title='Customization'
        description='Examples showing how to customize the gallery appearance and behavior.'
        id='customization'
      >
        <div className='space-y-6'>
          {/* Custom Heights */}
          <div>
            <h4 className='text-lg font-medium text-white mb-3'>Custom Container Heights</h4>
            <p className='text-gray-400 mb-4'>
              Control the gallery container height to fit your layout needs.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h5 className='font-medium text-gray-300 mb-2'>Compact (200px)</h5>
                <PhotoGallery
                  layout='horizontal'
                  size='sm'
                  containerHeight='200px'
                  initialPhotos={horizontalPhotos}
                />
              </div>
              <div>
                <h5 className='font-medium text-gray-300 mb-2'>Tall (400px)</h5>
                <PhotoGallery
                  layout='masonry'
                  size='md'
                  containerHeight='400px'
                  initialPhotos={masonryPhotos}
                />
              </div>
            </div>
          </div>

          {/* Without Captions */}
          <div>
            <h4 className='text-lg font-medium text-white mb-3'>Without Captions</h4>
            <p className='text-gray-400 mb-4'>
              Photos without captions for a cleaner look.
            </p>
            <PhotoGallery
              layout='grid'
              size='md'
              containerHeight='250px'
              initialPhotos={samplePhotos.map(photo => ({ ...photo, caption: undefined }))}
            />
          </div>
        </div>
      </ExampleSection>
    </ComponentPage>
  );
}