import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Project } from '../types';
import { useAuth } from './useAuth';

const API_BASE = 'http://127.0.0.1:8081/api';

export const useProjects = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  // Query: Fetch all projects
  const projectsQuery = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error('Failed to load projects');
      return res.json();
    },
    staleTime: 1000 * 30, // 30 seconds
  });

  // Mutation: Create new project (Protected by JWT)
  const createMutation = useMutation({
    mutationFn: async (newProject: Omit<Project, 'id' | 'created_at'>) => {
      if (!token) throw new Error('Authentication required');
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to create project');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  // Mutation: Delete project (Protected by JWT)
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) throw new Error('Authentication required');
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to delete project');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects: projectsQuery.data || [],
    isLoading: projectsQuery.isLoading,
    isError: projectsQuery.isError,
    error: projectsQuery.error,
    createProject: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteProject: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    refetch: projectsQuery.refetch,
  };
};
