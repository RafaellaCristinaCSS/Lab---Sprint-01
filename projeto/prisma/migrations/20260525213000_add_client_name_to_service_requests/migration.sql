-- Add explicit clientName field to align Sprint 2 entity requirements.
ALTER TABLE "service_requests"
ADD COLUMN "clientName" TEXT NOT NULL DEFAULT '';
