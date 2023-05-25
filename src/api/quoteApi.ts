import api from './api'

export type Quote = {
  id: string
  quote: string
  author: string
}
export type TopQuotesResponse = {
  quotes: Quote[]
}
export const fetchTopQuotes = () =>
  api.get<TopQuotesResponse>('quotes/top_quotes').then((res) => res.data.quotes)
export const postQuote = (quote: Omit<Quote, 'id'>) => api.post('quotes', quote)
 export const resetQuotes = () => api.post('quotes/reset', {})

export type QuotesData = {
     quotes: Quote[] 
     hasMore?: boolean
    }
export const fetchQuotesByPage = (page: number) => api.get<QuotesData>('quotes', { params: { page } }).then((res) => res.data)