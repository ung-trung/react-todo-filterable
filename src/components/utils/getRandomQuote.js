import morningQuotes from './morningQuotes'

const getQuotes = qutoes => qutoes[Math.floor(Math.random() * qutoes.length)]

export default getQuotes(morningQuotes).toString()
