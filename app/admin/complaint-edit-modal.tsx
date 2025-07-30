"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Save, X } from "lucide-react"

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

interface ComplaintEditModalProps {
  complaint: Complaint | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedComplaint: Complaint) => void
}

export function ComplaintEditModal({ complaint, isOpen, onClose, onSave }: ComplaintEditModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    status: "",
  })
  const { toast } = useToast()

  // Update form data when complaint changes
  useEffect(() => {
    if (complaint) {
      setFormData({
        title: complaint.title,
        description: complaint.description,
        category: complaint.category,
        priority: complaint.priority,
        status: complaint.status,
      })
    }
  }, [complaint])

  const handleSave = async () => {
    if (!complaint) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedComplaint = {
        ...complaint,
        ...formData,
        updatedAt: new Date().toISOString(),
      }

      onSave(updatedComplaint)
      toast({
        title: "Complaint Updated! ✅",
        description: "The complaint has been successfully updated.",
        variant: "success",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Update Failed ❌",
        description: "Failed to update the complaint. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!complaint) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Edit Complaint #{complaint.id}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Update complaint details and status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300 font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700 dark:text-gray-300 font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl resize-none"
            />
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700 dark:text-gray-300 font-medium">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl">
                  <SelectItem value="Product">🛍️ Product Issues</SelectItem>
                  <SelectItem value="Service">🤝 Service Quality</SelectItem>
                  <SelectItem value="Support">💬 Customer Support</SelectItem>
                  <SelectItem value="Billing">💳 Billing & Payments</SelectItem>
                  <SelectItem value="Technical">⚙️ Technical Problems</SelectItem>
                  <SelectItem value="Other">📋 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-gray-700 dark:text-gray-300 font-medium">
                Priority
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl">
                  <SelectItem value="Low">🟢 Low</SelectItem>
                  <SelectItem value="Medium">🟡 Medium</SelectItem>
                  <SelectItem value="High">🔴 High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status" className="text-gray-700 dark:text-gray-300 font-medium">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl">
                <SelectItem value="Open">🔵 Open</SelectItem>
                <SelectItem value="In Progress">🟡 In Progress</SelectItem>
                <SelectItem value="Resolved">🟢 Resolved</SelectItem>
                <SelectItem value="Closed">⚫ Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Metadata */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div>
              <strong>Complaint ID:</strong> {complaint.id}
            </div>
            <div>
              <strong>User ID:</strong> {complaint.userId}
            </div>
            <div>
              <strong>Created:</strong> {new Date(complaint.createdAt).toLocaleString()}
            </div>
            <div>
              <strong>Last Updated:</strong> {new Date(complaint.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-transparent border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 rounded-xl"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
