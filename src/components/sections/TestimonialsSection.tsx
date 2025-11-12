import { Star } from "lucide-react";
import jamesImg from "@/assets/testimonial-james.jpeg";
import robertImg from "@/assets/testimonial-robert.jpeg";
import samanthaImg from "@/assets/testimonial-samantha.jpeg";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "James Whitaker",
      location: "London, UK",
      image: jamesImg,
      rating: 5,
      text: "Whitestones Markets has transformed my investment portfolio. Their professional approach and consistent returns have exceeded my expectations. The team is responsive and the platform is incredibly user-friendly."
    },
    {
      name: "Robert Hayes",
      location: "New York, USA",
      image: robertImg,
      rating: 5,
      text: "I've been investing with Whitestones for over two years now. The returns have been exceptional, and the security measures give me complete peace of mind. Highly recommended for serious investors."
    },
    {
      name: "Samantha Rivera",
      location: "Los Angeles, USA",
      image: samanthaImg,
      rating: 5,
      text: "As a first-time investor, I was impressed by how easy Whitestones Markets made everything. The support team guided me through every step, and I'm already seeing great results from my investments."
    }
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
            What Our <span className="text-primary">Investors Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied investors who trust Whitestones Markets
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:shadow-xl"
            >
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                </div>
              </div>

              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground">{testimonial.text}</p>
              
              <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 transition-opacity group-hover:opacity-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
