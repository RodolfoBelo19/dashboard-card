const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

type FormatValueProps = {
  value: number;
}
export const FormatValue = ({value}: FormatValueProps) => {

  return (
    <div className={value <= 0 ? 'text-red-500' : ''}>
      {formatter.format(value)}
    </div>
  )
}