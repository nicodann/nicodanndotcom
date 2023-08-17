type eventProps = {
  description: string
}

export default function Event({description}:eventProps) {
  return (
    <div>
      <p>{description}</p>
    </div>
  )
}
