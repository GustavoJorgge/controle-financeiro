export const dataFormatter = new Intl.DateTimeFormat('pt-Br');

export const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',    
});