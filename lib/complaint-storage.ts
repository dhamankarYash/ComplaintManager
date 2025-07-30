// This file is no longer needed - replaced with MongoDB models
// Delete this file or keep it as reference

interface Complaint {
  id: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  createdAt: string
  updatedAt: string
  userId: string
}

// In-memory storage (in a real app, this would be a database)
const complaints: Complaint[] = [
  {
    id: "CMP-001",
    title: "Product Quality Issue - Damaged Package",
    description:
      "The product I received was damaged during shipping. The box was crushed and the item inside was broken.",
    category: "Product",
    priority: "High",
    status: "Open",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    userId: "user001",
  },
  {
    id: "CMP-002",
    title: "Billing Discrepancy - Double Charge",
    description: "I was charged twice for the same order #12345. Please refund the duplicate charge.",
    category: "Billing",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-12T16:30:00Z",
    userId: "user002",
  },
  {
    id: "CMP-003",
    title: "Customer Service Response Time",
    description: "It took too long to get a response from customer service. I waited 3 days for a simple question.",
    category: "Service",
    priority: "Low",
    status: "Resolved",
    createdAt: "2024-01-05T16:45:00Z",
    updatedAt: "2024-01-08T11:30:00Z",
    userId: "user003",
  },
]

// Placeholder functions for MongoDB operations
export function getAllComplaints(): Complaint[] {
  throw new Error("This function is no longer supported. Use MongoDB models instead.")
}

export function getComplaintsByUserId(userId: string): Complaint[] {
  throw new Error("This function is no longer supported. Use MongoDB models instead.")
}

export function addComplaint(complaint: Omit<Complaint, "id" | "createdAt" | "updatedAt">): Complaint {
  throw new Error("This function is no longer supported. Use MongoDB models instead.")
}

export function updateComplaint(id: string, updates: Partial<Complaint>): Complaint | null {
  throw new Error("This function is no longer supported. Use MongoDB models instead.")
}

export function deleteComplaint(id: string): boolean {
  throw new Error("This function is no longer supported. Use MongoDB models instead.")
}

export function getComplaintById(id: string): Complaint | null {
  throw new Error("This function is no longer supported. Use MongoDB models instead.")
}
