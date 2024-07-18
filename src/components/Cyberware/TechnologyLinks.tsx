import { Button } from "../ui/button";

const technologies = [
  { name: "React", url: "https://reactjs.org/" },
  { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "Spring Boot", url: "https://spring.io/projects/spring-boot" },
  { name: "TypeScript", url: "https://www.typescriptlang.org/" },
  { name: "NestJs", url: "https://nestjs.com/" },
  { name: "GraphQL", url: "https://graphql.org/" },
  { name: "Elysiajs", url: "https://elysiajs.com/" },
  { name: "Nginx", url: "https://nginx.org/" },
  { name: "Docker", url: "https://www.docker.com/" },
  { name: "Shadcn UI", url: "https://shadcn.dev/" },
  { name: "Tailwindcss", url: "https://tailwindcss.com/" },
  { name: "Astro", url: "https://astro.build/" },
  { name: "Nextjs", url: "https://nextjs.org/" },
  { name: "VueJs", url: "https://vuejs.org/" },
];

const TechnologyLinks: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap py-4  gap-4">
      {technologies.map((tech) => (
        <Button key={tech.name} asChild>
          <a href={tech.url} target="_blank" rel="noopener noreferrer">
            {tech.name}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default TechnologyLinks;
