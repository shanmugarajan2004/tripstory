import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripsApi, storiesApi, expensesApi, usersApi, authApi } from '@/lib/api';
import { useStore } from '@/store/useStore';

// ── Auth ──────────────────────────────────────────────────

export const useProfile = () =>
  useQuery({ queryKey: ['profile'], queryFn: authApi.getProfile });

// ── Trips ─────────────────────────────────────────────────

export const useTrips = (params?: any) =>
  useQuery({ queryKey: ['trips', params], queryFn: () => tripsApi.getAll(params) });

export const useTrip = (id: string) =>
  useQuery({ queryKey: ['trips', id], queryFn: () => tripsApi.getOne(id), enabled: !!id });

export const useCreateTrip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tripsApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
  });
};

export const useUpdateTrip = (id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => tripsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['trips', id] });
      qc.invalidateQueries({ queryKey: ['trips'] });
    },
  });
};

export const useDeleteTrip = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: tripsApi.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['trips'] }),
  });
};

export const useTripBudget = (id: string) =>
  useQuery({ queryKey: ['budget', id], queryFn: () => tripsApi.getBudget(id), enabled: !!id });

// ── Stories ───────────────────────────────────────────────

export const useStories = (params?: any) =>
  useQuery({ queryKey: ['stories', params], queryFn: () => storiesApi.getAll(params) });

export const useStory = (id: string) =>
  useQuery({ queryKey: ['stories', id], queryFn: () => storiesApi.getOne(id), enabled: !!id });

export const useCreateStory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: storiesApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['stories'] }),
  });
};

export const useLikeStory = (id: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => storiesApi.like(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['stories', id] }),
  });
};

// ── Expenses ──────────────────────────────────────────────

export const useExpenses = (tripId: string) =>
  useQuery({
    queryKey: ['expenses', tripId],
    queryFn: () => expensesApi.getByTrip(tripId),
    enabled: !!tripId,
  });

export const useAddExpense = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: expensesApi.add,
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['expenses', variables.tripId] });
    },
  });
};

export const useDeleteExpense = (tripId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: expensesApi.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['expenses', tripId] }),
  });
};

// ── Users ─────────────────────────────────────────────────

export const useUserStats = () =>
  useQuery({ queryKey: ['user-stats'], queryFn: usersApi.getStats });

export const useUserProfile = (username: string) =>
  useQuery({
    queryKey: ['user', username],
    queryFn: () => usersApi.getByUsername(username),
    enabled: !!username,
  });
