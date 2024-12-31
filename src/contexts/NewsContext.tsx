// // 'use client'

// // import React, { createContext, useState, useContext, useEffect } from 'react';

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

// // interface NewsContextType {
// //   articles: Article[];
// //   loading: boolean;
// //   error: string | null;
// //   fetchNews: (filters?: { author?: string; dateFrom?: string; dateTo?: string; type?: string }) => void;
// // }

// // const NewsContext = createContext<NewsContextType | undefined>(undefined);

// // export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const [articles, setArticles] = useState<Article[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   const fetchNews = async (filters?: { author?: string; dateFrom?: string; dateTo?: string; type?: string }) => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       // Replace with your actual API key
// //       const API_KEY = 'YOUR_API_KEY';
// //       let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

// //       if (filters) {
// //         if (filters.author) url += `&q=${encodeURIComponent(filters.author)}`;
// //         if (filters.dateFrom) url += `&from=${filters.dateFrom}`;
// //         if (filters.dateTo) url += `&to=${filters.dateTo}`;
// //         if (filters.type) url += `&category=${filters.type}`;
// //       }

// //       const response = await fetch(url);
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch news');
// //       }
// //       const data = await response.json();
// //       setArticles(data.articles);
// //     } catch (err) {
// //       setError('Failed to fetch news');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchNews();
// //   }, []);

// //   return (
// //     <NewsContext.Provider value={{ articles, loading, error, fetchNews }}>
// //       {children}
// //     </NewsContext.Provider>
// //   );
// // };

// // export const useNews = () => {
// //   const context = useContext(NewsContext);
// //   if (context === undefined) {
// //     throw new Error('useNews must be used within a NewsProvider');
// //   }
// //   return context;
// // };


// 'use client'
// import { createContext, useContext, ReactNode } from 'react';
// import { useNewsApi } from '../hooks/useNewsApi';

// const NewsContext = createContext<any>(null);

// export function NewsProvider({ children }: { children: ReactNode }) {
//   const newsData = useNewsApi();
//   return <NewsContext.Provider value={newsData}>{children}</NewsContext.Provider>;
// }

// export const useNews = () => useContext(NewsContext);

// contexts/NewsContext.tsx
'use client'
import { createContext, useContext, ReactNode } from 'react';
import { useNewsApi } from '../hooks/useNewsApi';

interface NewsContextType {
  news: any;
  loading: boolean;
  error: string | null;
}

const initialContext: NewsContextType = {
  news: null,
  loading: true,
  error: null
};

const NewsContext = createContext<NewsContextType>(initialContext);

export function NewsProvider({ children }: { children: ReactNode }) {
  const newsData = useNewsApi();
  return <NewsContext.Provider value={newsData}>{children}</NewsContext.Provider>;
}

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};