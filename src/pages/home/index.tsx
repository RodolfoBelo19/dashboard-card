const Person = [
  {
    id: 1,
    name: "John",
    age: 20,
  },
  {
    id: 2,
    name: "Doe",
    age: 18,
  },
];

export default function HomePage() {
  return (
    <main className="text-white">
      {Person.map((person) => (
        <div key={person.id}>
          <h1>{person.name}</h1>
          <h2>{person.age}</h2>
        </div>
      ))}
    </main>
  );
}
