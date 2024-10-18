// Importing the necessary components for the Home page
import PostFeed from "@/components/posts/PostFeed"; // Importing the PostFeed component to display posts
import Header from "@/components/Header"; // Importing the Header component to show the page header
import Form from "@/components/Form"; // Importing the Form component for user input

// Home component definition
export default function Home() {
  return (
    <>
      {/* Rendering the Header with a label prop set to "Home" */}
      <Header label="Home" />

      {/* Rendering the Form component with a placeholder for user input */}
      <Form placeholder="What's happening?" />

      {/* Rendering the PostFeed component to display a list of posts */}
      <PostFeed />
    </>
  )
}
