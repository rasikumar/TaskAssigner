/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Import React Query
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "../../../components/ui/select";
import { Label } from "../../../components/ui/label";
import { toast } from "react-toastify";

// Axios instance for API calls
import { editTask } from "@/API/admin/task/task_api";

const EditTask = ({ taskData = {}, isOpen, onClose }) => {
  const queryClient = useQueryClient(); // React Query client

  const [formData, setFormData] = useState({
    id: taskData._id || "",
    project_title: taskData.project_title || "",
    project_description: taskData.project_description || "",
    project_ownership: taskData.project_ownership || "",
    assigned_to: taskData.assigned_to || "",
    report_to: taskData.report_to || "",
    status: taskData.status || "Not started",
    priority: taskData.priority || "Low",
    start_date: taskData.start_date || "",
    end_date: taskData.end_date || "",
  });

  // React Query mutation for updating tasks
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await editTask(updatedData);
      console.log(response.message);
      toast.error(response.message);
      return response.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]); // Refresh task list after success
      onClose(); // Close modal after successful update
    },
    onError: (error) => {
      console.error("Update failed:", error);
      alert("Failed to update task. Please try again.");
    },
  });

  useEffect(() => {
    // Update form when taskData changes
    if (taskData._id) {
      setFormData({
        id: taskData._id || "",
        project_title: taskData.project_title || "",
        project_description: taskData.project_description || "",
        project_ownership: taskData.project_ownership || "",
        assigned_to: taskData.assigned_to || "",
        report_to: taskData.report_to || "",
        status: taskData.status || "Not started",
        priority: taskData.priority || "Low",
        start_date: taskData.start_date || "",
        end_date: taskData.end_date || "",
      });
    }
  }, [taskData]);

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData); // Trigger the React Query mutation
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-6 max-w-lg text-taskBlack bg-bg h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Task
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Modify the details of the task below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Task Details</h3>
              <div>
                <Label htmlFor="project_title">Task Title</Label>
                <Input
                  id="project_title"
                  name="project_title"
                  value={formData.project_title}
                  onChange={(e) =>
                    handleSelectChange("project_title", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="project_description">Task Description</Label>
                <Textarea
                  id="project_description"
                  name="project_description"
                  value={formData.project_description}
                  onChange={(e) =>
                    handleSelectChange("project_description", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Priority Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Priority</h3>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleSelectChange("priority", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Very High</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Regular">Normal</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dates Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dates</h3>
              <div>
                <Label htmlFor="start_date">Start Date</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    handleSelectChange("start_date", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) =>
                    handleSelectChange("end_date", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={mutation.isLoading} // Disable button during loading
              >
                {mutation.isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditTask;
