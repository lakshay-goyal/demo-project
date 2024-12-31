// 'use client'
// import { useNews } from '@/contexts/NewsContext';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function Dashboard() {
//   const { news, loading, error } = useNews();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-8">News Dashboard</h1>
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {news?.articles.map((article) => (
//           <Card key={article.url}>
//             <CardHeader>
//               <CardTitle>{article.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>{article.description}</p>
//               <p className="text-sm text-gray-500 mt-2">By {article.author}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


// app/dashboard/page.tsx
'use client'
import { useNews } from '@/contexts/NewsContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { news, loading, error } = useNews();

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!news) return <div className="p-4">No news available</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">News Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.articles?.map((article: any) => (
          <Card key={article.url}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{article.description}</p>
              <p className="text-sm text-gray-500 mt-2">By {article.author}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}