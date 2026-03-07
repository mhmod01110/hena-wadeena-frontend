import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Filter, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { searchAPI, type SearchResult } from "@/services/api";

const typeLabels: Record<string, string> = {
  poi: "مكان", attraction: "معلم سياحي", guide: "مرشد",
  supplier: "مورّد", investment: "استثمار", transport: "نقل",
};
const typeColors: Record<string, string> = {
  poi: "bg-blue-500/10 text-blue-600", attraction: "bg-green-500/10 text-green-600",
  guide: "bg-purple-500/10 text-purple-600", supplier: "bg-orange-500/10 text-orange-600",
  investment: "bg-yellow-500/10 text-yellow-600", transport: "bg-red-500/10 text-red-600",
};

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);

  const doSearch = (q: string, type?: string) => {
    const t = type || typeFilter;
    searchAPI.search(q, t || undefined).then((r) => { setResults(r.data); setTotal(r.total); }).catch(console.error);
    setSearchParams({ q, ...(t ? { type: t } : {}) });
  };

  useEffect(() => {
    if (query) doSearch(query, typeFilter);
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); doSearch(query); };
  const filterByType = (type: string) => { const t = typeFilter === type ? "" : type; setTypeFilter(t); doSearch(query, t); };

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container px-4 max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-center">بحث في المنصة 🔍</h1>

          <form onSubmit={handleSubmit} className="relative mb-6">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="ابحث عن أماكن، مرشدين، فرص استثمارية..." value={query} onChange={(e) => setQuery(e.target.value)} className="pr-12 h-14 text-lg" />
          </form>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(typeLabels).map(([key, label]) => (
              <Button key={key} variant={typeFilter === key ? "default" : "outline"} size="sm" onClick={() => filterByType(key)}>
                {label}
              </Button>
            ))}
          </div>

          {/* Results */}
          {query && <p className="text-sm text-muted-foreground mb-4">{total} نتيجة لـ "{query}"</p>}
          <div className="space-y-3">
            {results.map((r) => (
              <Link key={r.id} to={r.url}>
                <Card className="hover:shadow-md hover:border-primary/30 transition-all mb-3 cursor-pointer">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={typeColors[r.type] || ""} variant="outline">{typeLabels[r.type] || r.type}</Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />{r.location}</span>
                      </div>
                      <h3 className="font-semibold text-foreground">{r.title}</h3>
                      <p className="text-sm text-muted-foreground">{r.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            {query && results.length === 0 && (
              <Card><CardContent className="p-12 text-center text-muted-foreground">لا توجد نتائج. جرب كلمات بحث مختلفة.</CardContent></Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchResultsPage;
