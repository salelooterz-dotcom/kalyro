import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  contacts,
  projects,
  teamMembers,
  services,
  testimonials,
  type Contact,
  type InsertContact,
  type Project,
  type InsertProject,
  type TeamMember,
  type InsertTeamMember,
  type Service,
  type InsertService,
  type Testimonial,
  type InsertTestimonial,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
  
  createProject(project: InsertProject): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  
  getAllTeamMembers(): Promise<TeamMember[]>;
  
  getAllServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  
  getAllTestimonials(): Promise<Testimonial[]>;
}

export class DatabaseStorage implements IStorage {
  private db;

  constructor() {
    const client = postgres(process.env.DATABASE_URL!);
    this.db = drizzle({ client });
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await this.db.insert(contacts).values(contact).returning();
    return newContact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await this.db.insert(projects).values(project).returning();
    return newProject;
  }

  async getAllProjects(): Promise<Project[]> {
    return await this.db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await this.db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.createdAt));
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    const [project] = await this.db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getAllTeamMembers(): Promise<TeamMember[]> {
    return await this.db.select().from(teamMembers).orderBy(teamMembers.order);
  }

  async getAllServices(): Promise<Service[]> {
    return await this.db.select().from(services).orderBy(services.order);
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await this.db.insert(services).values(service).returning();
    return newService;
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await this.db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private currentId: number;

  constructor() {
    this.contacts = new Map();
    this.currentId = 1;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const newContact: Contact = {
      id,
      name: contact.name,
      email: contact.email,
      company: contact.company ?? null,
      message: contact.message,
      phone: contact.phone ?? null,
      createdAt: new Date()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Stubs for other methods to satisfy interface
  async createProject(project: InsertProject): Promise<Project> { throw new Error("Method not implemented."); }
  async getAllProjects(): Promise<Project[]> { return []; }
  async getFeaturedProjects(): Promise<Project[]> { return []; }
  async getProjectById(id: number): Promise<Project | undefined> { return undefined; }
  async getAllTeamMembers(): Promise<TeamMember[]> { return []; }
  async getAllServices(): Promise<Service[]> { return []; }
  async createService(service: InsertService): Promise<Service> { throw new Error("Method not implemented."); }
  async getAllTestimonials(): Promise<Testimonial[]> { return []; }
}

export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
