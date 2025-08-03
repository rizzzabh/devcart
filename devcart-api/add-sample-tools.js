import mongoose from "mongoose";
import dotenv from "dotenv";
import { Tool } from "./models/Tool.js";

dotenv.config();

const sampleTools = [
  {
    title: "CodeWhisperer Pro",
    description: "Revolutionary AI-powered code assistant that understands your coding style and provides intelligent suggestions in real-time. Features include smart autocomplete, bug detection, code optimization suggestions, and natural language code generation. Perfect for developers who want to write cleaner, more efficient code faster. Supports 20+ programming languages including JavaScript, Python, React, Node.js, and more. Includes advanced features like code refactoring suggestions, security vulnerability detection, and automated documentation generation.",
    price: "29.99",
    tags: "AI, Code Assistant, JavaScript, Python, React, Node.js, Productivity, Development Tools",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop"
  },
  {
    title: "DeployMaster",
    description: "Complete cloud deployment automation suite that streamlines your CI/CD pipeline. One-click deployments to AWS, Google Cloud, Azure, and Vercel. Features include automated testing, blue-green deployments, rollback capabilities, and real-time monitoring. Includes built-in security scanning, performance optimization, and cost management tools. Perfect for teams looking to automate their deployment process and reduce deployment time from hours to minutes. Supports Docker, Kubernetes, and serverless architectures.",
    price: "49.99",
    tags: "DevOps, Cloud Deployment, AWS, Azure, CI/CD, Docker, Kubernetes, Automation, Infrastructure",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop"
  },
  {
    title: "DataFlow Studio",
    description: "Advanced database management and visualization platform that makes complex data operations simple. Features include visual query builder, real-time data monitoring, automated backup systems, and performance analytics. Supports MongoDB, PostgreSQL, MySQL, and Redis with seamless migration tools. Includes data modeling tools, schema visualization, and automated optimization suggestions. Perfect for developers and data engineers who need to manage complex databases efficiently. Features advanced security with role-based access control and audit logging.",
    price: "39.99",
    tags: "Database, MongoDB, PostgreSQL, MySQL, Data Visualization, Analytics, Performance, Security, Monitoring",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
  },
  {
    title: "APICraft",
    description: "Comprehensive API development and testing platform that accelerates your API lifecycle. Features include automated API documentation generation, real-time testing, performance benchmarking, and security scanning. Supports REST, GraphQL, and WebSocket APIs with built-in mocking and staging environments. Includes advanced features like rate limiting simulation, load testing, and API versioning tools. Perfect for developers building microservices or full-stack applications. Features collaborative development tools with team sharing and real-time collaboration.",
    price: "24.99",
    tags: "API Development, REST, GraphQL, Testing, Documentation, Microservices, Performance, Collaboration, WebSocket",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=300&fit=crop"
  }
];

const addSampleTools = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing tools (optional - remove this if you want to keep existing tools)
    // await Tool.deleteMany({});
    // console.log("Cleared existing tools");

    // Add sample tools
    const createdTools = await Tool.insertMany(sampleTools);
    console.log(`Successfully added ${createdTools.length} tools to the database:`);
    
    createdTools.forEach(tool => {
      console.log(`- ${tool.title} ($${tool.price})`);
    });

    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error adding sample tools:", error);
    process.exit(1);
  }
};

addSampleTools(); 