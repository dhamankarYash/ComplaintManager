// "use client"

// import { useState, useEffect } from "react"
// import { useAuth } from "@/hooks/use-auth"
// import { useRouter } from "next/navigation"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useToast } from "@/hooks/use-toast"
// import { ComplaintEditModal } from "@/components/ui/complaint-edit-modal"
// import {
//   Loader2,
//   Shield,
//   MessageSquare,
//   Eye,
//   Edit,
//   Trash2,
//   Search,
//   Filter,
//   RefreshCw,
//   Clock,
//   CheckCircle,
//   AlertTriangle,
// } from "lucide-react"

// interface Complaint {
//   id: string
//   title: string
//   description: string
//   category: string
//   priority: string
//   status: string
//   createdAt: string
//   updatedAt: string
//   userId: string
//   userEmail: string
// }

// export default function AdminPage() {
//   const [complaints, setComplaints] = useState<Complaint[]>([])
//   const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([])
//   const [loading, setLoading] = useState(true)
//   const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [priorityFilter, setPriorityFilter] = useState("all")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [stats, setStats] = useState({
//     total: 0,
//     open: 0,
//     inProgress: 0,
//     resolved: 0,
//   })
//   const { user, loading: authLoading } = useAuth()
//   const router = useRouter()
//   const { toast } = useToast()

//   useEffect(() => {
//     if (!authLoading && (!user || user.role !== "admin")) {
//       router.push("/auth/login?type=admin")
//       return
//     }

//     if (user && user.role === "admin") {
//       fetchComplaints()
//     }
//   }, [user, authLoading, router])

//   useEffect(() => {
//     // Filter complaints based on search and filters
//     let filtered = complaints

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (complaint) =>
//           complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           complaint.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           complaint.userEmail.toLowerCase().includes(searchTerm.toLowerCase()),
//       )
//     }

//     // Status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((complaint) => complaint.status === statusFilter)
//     }

//     // Priority filter
//     if (priorityFilter !== "all") {
//       filtered = filtered.filter((complaint) => complaint.priority === priorityFilter)
//     }

//     // Category filter
//     if (categoryFilter !== "all") {
//       filtered = filtered.filter((complaint) => complaint.category === categoryFilter)
//     }

//     setFilteredComplaints(filtered)
//   }, [complaints, searchTerm, statusFilter, priorityFilter, categoryFilter])

//   const fetchComplaints = async () => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await fetch("/api/complaints", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setComplaints(data.complaints || [])

//         // Calculate stats
//         const complaintsData = data.complaints || []
//         const total = complaintsData.length
//         const open = complaintsData.filter((c: Complaint) => c.status === "Open").length
//         const inProgress = complaintsData.filter((c: Complaint) => c.status === "In Progress").length
//         const resolved = complaintsData.filter((c: Complaint) => c.status === "Resolved").length

//         setStats({ total, open, inProgress, resolved })
//       } else {
//         toast({
//           title: "Error Loading Complaints",
//           description: "Failed to load complaints. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Connection Error",
//         description: "Unable to connect to the server. Please check your connection.",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleEditComplaint = (complaint: Complaint) => {
//     setEditingComplaint(complaint)
//     setIsEditModalOpen(true)
//   }

//   const handleSaveComplaint = async (updatedComplaint: Complaint): Promise<void> => {
//     try {
//       const token = localStorage.getItem("token")
//       const response = await fetch(`/api/complaints/${updatedComplaint.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedComplaint),
//       })

//       if (response.ok) {
//         // Update local state
//         setComplaints((prev) =>
//           prev.map((complaint) => (complaint.id === updatedComplaint.id ? updatedComplaint : complaint)),
//         )

//         // Recalculate stats
//         const updatedComplaints = complaints.map((complaint) =>
//           complaint.id === updatedComplaint.id ? updatedComplaint : complaint,
//         )
//         const total = updatedComplaints.length
//         const open = updatedComplaints.filter((c) => c.status === "Open").length
//         const inProgress = updatedComplaints.filter((c) => c.status === "In Progress").length
//         const resolved = updatedComplaints.filter((c) => c.status === "Resolved").length

//         setStats({ total, open, inProgress, resolved })
//       } else {
//         throw new Error("Failed to update complaint")
//       }
//     } catch (error) {
//       throw error // Re-throw to be handled by the modal
//     }
//   }

//   const handleDeleteComplaint = async (complaintId: string) => {
//     if (!confirm("Are you sure you want to delete this complaint? This action cannot be undone.")) {
//       return
//     }

//     try {
//       const token = localStorage.getItem("token")
//       const response = await fetch(`/api/complaints/${complaintId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response.ok) {
//         setComplaints((prev) => prev.filter((complaint) => complaint.id !== complaintId))
//         toast({
//           title: "Complaint Deleted! 🗑️",
//           description: "The complaint has been successfully deleted.",
//           variant: "success",
//         })

//         // Recalculate stats
//         const updatedComplaints = complaints.filter((complaint) => complaint.id !== complaintId)
//         const total = updatedComplaints.length
//         const open = updatedComplaints.filter((c) => c.status === "Open").length
//         const inProgress = updatedComplaints.filter((c) => c.status === "In Progress").length
//         const resolved = updatedComplaints.filter((c) => c.status === "Resolved").length

//         setStats({ total, open, inProgress, resolved })
//       } else {
//         toast({
//           title: "Delete Failed",
//           description: "Failed to delete complaint. Please try again.",
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Connection Error 🔌",
//         description: "Unable to delete complaint. Please check your connection.",
//         variant: "destructive",
//       })
//     }
//   }

//   const clearFilters = () => {
//     setSearchTerm("")
//     setStatusFilter("all")
//     setPriorityFilter("all")
//     setCategoryFilter("all")
//   }

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "open":
//         return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
//       case "in progress":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
//       case "resolved":
//         return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority.toLowerCase()) {
//       case "high":
//         return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
//       case "medium":
//         return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
//       case "low":
//         return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
//     }
//   }

//   if (authLoading || loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20">
//         <div className="text-center">
//           <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
//           <p className="text-gray-600 dark:text-gray-300 text-lg">Loading admin dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20 p-4">
//         <div className="container mx-auto max-w-7xl py-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <Shield className="h-8 w-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
//               Admin Dashboard 🛡️
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-lg">
//               Welcome {user?.email} - Manage and monitor all complaint submissions
//             </p>
//           </div>

//           {/* Admin Tasks Overview */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//             <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
//                   <MessageSquare className="h-4 w-4" />
//                   Manage Complaints
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl font-bold text-blue-600">{stats.total}</span>
//                   <span className="text-sm text-gray-500">Total</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
//                   <Clock className="h-4 w-4" />
//                   Pending Review
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl font-bold text-blue-600">{stats.open}</span>
//                   <span className="text-sm text-gray-500">Open</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
//                   <AlertTriangle className="h-4 w-4" />
//                   In Progress
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl font-bold text-yellow-600">{stats.inProgress}</span>
//                   <span className="text-sm text-gray-500">Active</span>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
//                   <CheckCircle className="h-4 w-4" />
//                   Resolved
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center gap-2">
//                   <span className="text-2xl font-bold text-green-600">{stats.resolved}</span>
//                   <span className="text-sm text-gray-500">Completed</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Demo Credentials Info */}
//           <Card className="bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800 rounded-2xl border-2 mb-8">
//             <CardContent className="p-6">
//               <div className="flex items-start gap-3">
//                 <Shield className="h-6 w-6 text-orange-600 mt-1" />
//                 <div>
//                   <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Demo Admin Account</h3>
//                   <div className="text-sm space-y-1 text-orange-700 dark:text-orange-300">
//                     <div>
//                       <strong>Email:</strong> admin@example.com
//                     </div>
//                     <div>
//                       <strong>Password:</strong> admin123
//                     </div>
//                     <div className="text-xs text-orange-600 dark:text-orange-400 mt-2">
//                       This is a demo account with full administrative privileges for testing purposes.
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Filters and Search */}
//           <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 mb-8">
//             <CardHeader>
//               <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
//                 <Filter className="h-5 w-5" />
//                 Filters & Search
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//                 {/* Search */}
//                 <div className="lg:col-span-2">
//                   <div className="relative">
//                     <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                     <Input
//                       placeholder="Search complaints..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="pl-10 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl"
//                     />
//                   </div>
//                 </div>

//                 {/* Status Filter */}
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
//                     <SelectValue placeholder="All Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Status</SelectItem>
//                     <SelectItem value="Open">Open</SelectItem>
//                     <SelectItem value="In Progress">In Progress</SelectItem>
//                     <SelectItem value="Resolved">Resolved</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 {/* Priority Filter */}
//                 <Select value={priorityFilter} onValueChange={setPriorityFilter}>
//                   <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
//                     <SelectValue placeholder="All Priority" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Priority</SelectItem>
//                     <SelectItem value="High">High</SelectItem>
//                     <SelectItem value="Medium">Medium</SelectItem>
//                     <SelectItem value="Low">Low</SelectItem>
//                   </SelectContent>
//                 </Select>

//                 {/* Category Filter */}
//                 <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                   <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
//                     <SelectValue placeholder="All Categories" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Categories</SelectItem>
//                     <SelectItem value="Product">Product</SelectItem>
//                     <SelectItem value="Service">Service</SelectItem>
//                     <SelectItem value="Support">Support</SelectItem>
//                     <SelectItem value="Billing">Billing</SelectItem>
//                     <SelectItem value="Technical">Technical</SelectItem>
//                     <SelectItem value="Other">Other</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex justify-between items-center mt-4">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Showing {filteredComplaints.length} of {complaints.length} complaints
//                 </p>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={clearFilters}
//                     className="bg-transparent border-gray-200 dark:border-gray-600 rounded-xl"
//                   >
//                     Clear Filters
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={fetchComplaints}
//                     className="bg-transparent border-gray-200 dark:border-gray-600 rounded-xl"
//                   >
//                     <RefreshCw className="h-4 w-4 mr-2" />
//                     Refresh
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Complaints List */}
//           <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0">
//             <CardHeader>
//               <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
//                 Complaints Management
//               </CardTitle>
//               <CardDescription className="text-gray-600 dark:text-gray-300">
//                 Manage and respond to customer complaints
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {filteredComplaints.length === 0 ? (
//                 <div className="text-center py-12">
//                   <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
//                     {complaints.length === 0 ? "No complaints yet" : "No complaints match your filters"}
//                   </h3>
//                   <p className="text-gray-500 dark:text-gray-400">
//                     {complaints.length === 0
//                       ? "When customers submit complaints, they will appear here."
//                       : "Try adjusting your search terms or filters."}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {filteredComplaints.map((complaint) => (
//                     <div
//                       key={complaint.id}
//                       className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h4 className="font-semibold text-gray-900 dark:text-gray-100">{complaint.title}</h4>
//                           <Badge className={`${getStatusColor(complaint.status)} border-0`}>{complaint.status}</Badge>
//                           <Badge className={`${getPriorityColor(complaint.priority)} border-0`}>
//                             {complaint.priority}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
//                           {complaint.description}
//                         </p>
//                         <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
//                           <span>ID: {complaint.id}</span>
//                           <span>Category: {complaint.category}</span>
//                           <span>User: {complaint.userEmail}</span>
//                           <span>Created: {new Date(complaint.createdAt).toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 ml-4">
//                         <Button variant="outline" size="sm" className="bg-transparent">
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="bg-transparent text-blue-600 hover:text-blue-700"
//                           onClick={() => handleEditComplaint(complaint)}
//                         >
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="bg-transparent text-red-600 hover:text-red-700"
//                           onClick={() => handleDeleteComplaint(complaint.id)}
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       <ComplaintEditModal
//         complaint={editingComplaint}
//         isOpen={isEditModalOpen}
//         onClose={() => {
//           setIsEditModalOpen(false)
//           setEditingComplaint(null)
//         }}
//         onSave={handleSaveComplaint}
//       />
//     </>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ComplaintEditModal } from "@/components/ui/complaint-edit-modal"
import {
  Loader2,
  Shield,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

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
  userEmail: string
}

export default function AdminPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [editingComplaint, setEditingComplaint] = useState<Complaint | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  })
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login?type=admin")
      return
    }

    if (user && user.role === "admin") {
      fetchComplaints()
    }
  }, [user, authLoading, router])

  useEffect(() => {
    // Filter complaints based on search and filters
    let filtered = complaints

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (complaint) =>
          complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          complaint.userEmail.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((complaint) => complaint.status === statusFilter)
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((complaint) => complaint.priority === priorityFilter)
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((complaint) => complaint.category === categoryFilter)
    }

    setFilteredComplaints(filtered)
  }, [complaints, searchTerm, statusFilter, priorityFilter, categoryFilter])

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/complaints", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setComplaints(data.complaints || [])

        // Calculate stats
        const complaintsData = data.complaints || []
        const total = complaintsData.length
        const open = complaintsData.filter((c: Complaint) => c.status === "Open").length
        const inProgress = complaintsData.filter((c: Complaint) => c.status === "In Progress").length
        const resolved = complaintsData.filter((c: Complaint) => c.status === "Resolved").length

        setStats({ total, open, inProgress, resolved })
      } else {
        toast({
          title: "Error Loading Complaints",
          description: "Failed to load complaints. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the server. Please check your connection.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditComplaint = (complaint: Complaint) => {
    setEditingComplaint(complaint)
    setIsEditModalOpen(true)
  }

  const handleSaveComplaint = async (updatedComplaint: Complaint): Promise<void> => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/complaints/${updatedComplaint.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedComplaint),
      })

      if (response.ok) {
        // Update local state
        setComplaints((prev) =>
          prev.map((complaint) => (complaint.id === updatedComplaint.id ? updatedComplaint : complaint)),
        )

        // Recalculate stats
        const updatedComplaints = complaints.map((complaint) =>
          complaint.id === updatedComplaint.id ? updatedComplaint : complaint,
        )
        const total = updatedComplaints.length
        const open = updatedComplaints.filter((c) => c.status === "Open").length
        const inProgress = updatedComplaints.filter((c) => c.status === "In Progress").length
        const resolved = updatedComplaints.filter((c) => c.status === "Resolved").length

        setStats({ total, open, inProgress, resolved })
      } else {
        throw new Error("Failed to update complaint")
      }
    } catch (error) {
      throw error // Re-throw to be handled by the modal
    }
  }

  const handleDeleteComplaint = async (complaintId: string) => {
    if (!confirm("Are you sure you want to delete this complaint? This action cannot be undone.")) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/complaints/${complaintId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setComplaints((prev) => prev.filter((complaint) => complaint.id !== complaintId))
        toast({
          title: "Complaint Deleted! 🗑️",
          description: "The complaint has been successfully deleted.",
          variant: "success",
        })

        // Recalculate stats
        const updatedComplaints = complaints.filter((complaint) => complaint.id !== complaintId)
        const total = updatedComplaints.length
        const open = updatedComplaints.filter((c) => c.status === "Open").length
        const inProgress = updatedComplaints.filter((c) => c.status === "In Progress").length
        const resolved = updatedComplaints.filter((c) => c.status === "Resolved").length

        setStats({ total, open, inProgress, resolved })
      } else {
        toast({
          title: "Delete Failed",
          description: "Failed to delete complaint. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Connection Error 🔌",
        description: "Unable to delete complaint. Please check your connection.",
        variant: "destructive",
      })
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setCategoryFilter("all")
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "in progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      case "medium":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100 dark:from-gray-900 dark:via-orange-900/20 dark:to-red-900/20 p-4">
        <div className="container mx-auto max-w-7xl py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Admin Dashboard 🛡️
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Manage and monitor all complaint submissions
            </p>
          </div>

          {/* Admin Tasks Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Manage Complaints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">{stats.total}</span>
                  <span className="text-sm text-gray-500">Total</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">{stats.open}</span>
                  <span className="text-sm text-gray-500">Open</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-yellow-600">{stats.inProgress}</span>
                  <span className="text-sm text-gray-500">Active</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Resolved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">{stats.resolved}</span>
                  <span className="text-sm text-gray-500">Completed</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0 mb-8">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search complaints..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>

                {/* Priority Filter */}
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
                    <SelectValue placeholder="All Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Billing">Billing</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredComplaints.length} of {complaints.length} complaints
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="bg-transparent border-gray-200 dark:border-gray-600 rounded-xl"
                  >
                    Clear Filters
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchComplaints}
                    className="bg-transparent border-gray-200 dark:border-gray-600 rounded-xl"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Complaints List */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl rounded-2xl border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Complaints Management
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Manage and respond to customer complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredComplaints.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                    {complaints.length === 0 ? "No complaints yet" : "No complaints match your filters"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {complaints.length === 0
                      ? "When customers submit complaints, they will appear here."
                      : "Try adjusting your search terms or filters."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredComplaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{complaint.title}</h4>
                          <Badge className={`${getStatusColor(complaint.status)} border-0`}>{complaint.status}</Badge>
                          <Badge className={`${getPriorityColor(complaint.priority)} border-0`}>
                            {complaint.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                          {complaint.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>ID: {complaint.id}</span>
                          <span>Category: {complaint.category}</span>
                          <span>User: {complaint.userEmail}</span>
                          <span>Created: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent text-blue-600 hover:text-blue-700"
                          onClick={() => handleEditComplaint(complaint)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteComplaint(complaint.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Modal */}
      <ComplaintEditModal
        complaint={editingComplaint}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingComplaint(null)
        }}
        onSave={handleSaveComplaint}
      />
    </>
  )
}
