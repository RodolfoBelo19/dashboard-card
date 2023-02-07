const Person = [
  {
    name: "John",
    age: 20,
  }
]
export default function HomePage() {
  return (
    <main className="text-white">
      {Person.map((person, index) => (
        <div key={index}>
          <h1>{person.name}</h1>
          <h2>{person.age}</h2>
        </div>
      ))}
    </main>
  );
}