'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useNews } from '@/contexts/NewsProvider'
import { useTheme } from '@/contexts/ThemeProvider'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, LineChart, Search, User, FileText, DollarSign, Moon, Sun } from 'lucide-react'
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Select } from "@/components/ui/select"
import { Table } from "@/components/ui/table"
import { BarChart, PieChart } from "@/components/ui/chart"
import LoginForm from '@/components/LoginForm'
import ExportButtons from '@/components/ExportButtons'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { articles, loading, error, fetchNews } = useNews()
  const { theme, toggleTheme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [selectedType, setSelectedType] = useState('')
  const [payoutRates, setPayoutRates] = useState<{[key: string]: number}>({})

  useEffect(() => {
    const storedRates = localStorage.getItem('payoutRates')
    if (storedRates) {
      setPayoutRates(JSON.parse(storedRates))
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchNews({ 
      author: searchTerm, 
      dateFrom: dateRange.from, 
      dateTo: dateRange.to, 
      type: selectedType 
    })
  }

  const handlePayoutRateChange = (author: string, rate: number) => {
    const newRates = { ...payoutRates, [author]: rate }
    setPayoutRates(newRates)
    localStorage.setItem('payoutRates', JSON.stringify(newRates))
  }

  const calculateTotalPayout = () => {
    return articles.reduce((total, article) => {
      const rate = payoutRates[article.author] || 0
      return total + rate
    }, 0)
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Content Dashboard</h1>
        <div className="flex w-full md:w-auto gap-2">
          <form onSubmit={handleSearch} className="flex gap-2 flex-wrap">
            <Input 
              className="max-w-sm" 
              placeholder="Search articles..." 
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <DateRangePicker 
              from={dateRange.from}
              to={dateRange.to}
              onSelect={setDateRange}
            />
            <Select
              options={['news', 'blog']}
              value={selectedType}
              onChange={setSelectedType}
              placeholder="Select type"
            />
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          <Button variant="outline" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="outline" onClick={logout}>
            <User className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Authors</CardTitle>
            <User className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(articles.map(article => article.author)).size}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Payout</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${calculateTotalPayout().toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {articles.filter(article => new Date(article.publishedAt).getMonth() === new Date().getMonth()).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Article Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart 
              data={articles.reduce((acc, article) => {
                const date = new Date(article.publishedAt).toLocaleDateString()
                acc[date] = (acc[date] || 0) + 1
                return acc
              }, {} as {[key: string]: number})}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Article Types</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart 
              data={articles.reduce((acc, article) => {
                acc[article.type] = (acc[article.type] || 0) + 1
                return acc
              }, {} as {[key: string]: number})}
            />
          </CardContent>
        </Card>
      </div>

      {/* Payout Table */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Payout Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            data={articles}
            columns={[
              { header: 'Author', accessor: 'author' },
              { header: 'Title', accessor: 'title' },
              { header: 'Type', accessor: 'type' },
              { 
                header: 'Payout Rate', 
                accessor: 'author',
                cell: (value) => (
                  <Input
                    type="number"
                    value={payoutRates[value] || 0}
                    onChange={(e) => handlePayoutRateChange(value, Number(e.target.value))}
                  />
                )
              },
              { 
                header: 'Payout', 
                accessor: 'author',
                cell: (value) => `$${(payoutRates[value] || 0).toFixed(2)}`
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Export Buttons */}
      <ExportButtons data={articles} />

      {/* Error Handling */}
      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
    </div>
  )
}

