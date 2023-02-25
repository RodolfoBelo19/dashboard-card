const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

type FormatValueProps = {
  value: number;
}
export const FormatValue = ({ value }: FormatValueProps) => {

  return (
    <div>
      {formatter.format(value)}
    </div>
  )
}