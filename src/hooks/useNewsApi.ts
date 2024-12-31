// // import { useState, useEffect } from 'react';

// // // Replace 'YOUR_API_KEY' with your actual NewsAPI key
// // const API_KEY = 'a19f75d862c24b849a6118d3cecaeb52';

// // interface Article {
// //   source: {
// //     id: string | null;
// //     name: string;
// //   };
// //   author: string;
// //   title: string;
// //   description: string;
// //   url: string;
// //   urlToImage: string;
// //   publishedAt: string;
// //   content: string;
// // }

// // interface NewsApiResponse {
// //   status: string;
// //   totalResults: number;
// //   articles: Article[];
// // }

// // export const useNewsApi = () => {
// //   const [news, setNews] = useState<NewsApiResponse | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchNews = async () => {
// //       try {
// //         const response = await fetch(
// //           `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`
// //         );
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch news');
// //         }
// //         const data: NewsApiResponse = await response.json();
// //         setNews(data);
// //         setLoading(false);
// //       } catch (err) {
// //         setError('Failed to fetch news');
// //         setLoading(false);
// //       }
// //     };

// //     fetchNews();
// //   }, []);

// //   return { news, loading, error };
// // };


// import { useState, useEffect } from 'react';

// interface Article {
//   source: {
//     id: string | null;
//     name: string;
//   };
//   author: string;
//   title: string;
//   description: string;
//   url: string;
//   urlToImage: string;
//   publishedAt: string;
//   content: string;
// }

// interface NewsApiResponse {
//   status: string;
//   totalResults: number;
//   articles: Article[];
// }

// export const useNewsApi = () => {
//   const [news, setNews] = useState<NewsApiResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const response = await fetch('/api/news');
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: NewsApiResponse = await response.json();
//         setNews(data);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch news');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   return { news, loading, error };
// };




// hooks/useNewsApi.ts
import { useState, useEffect } from 'react';

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export const useNewsApi = () => {
  const [news, setNews] = useState<NewsApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: NewsApiResponse = await response.json();
        setNews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};

