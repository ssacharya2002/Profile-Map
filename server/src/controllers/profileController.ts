import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { ProfileData } from '../types/profile';

// Get all profiles
export const getProfiles = asyncHandler(async (req: Request, res: Response) => {
  const profiles = await prisma.profile.findMany({
    include: {
      contact: true,
    },
  });
  res.json(profiles);
});

// Get single profile
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      contact: true,
    },
  });

  if (!profile) {
    res.status(404);
    throw new Error('Profile not found');
  }

  res.json(profile);
});

// Create profile
export const createProfile = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as ProfileData;
  const { email, phone, ...profileData } = body;

  const profile = await prisma.profile.create({
    data: {
      ...profileData,
      contact: {
        create: {
          email,
          phone,
        },
      },
    },
    include: {
      contact: true,
    },
  });

  res.status(201).json(profile);
});

// Update profile
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body as ProfileData;
  const { email, phone, ...profileData } = body;

  const profile = await prisma.profile.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...profileData,
      contact: {
        update: {
          email,
          phone,
        },
      },
    },
    include: {
      contact: true,
    },
  });

  res.json(profile);
});

// Delete profile
export const deleteProfile = asyncHandler(async (req: Request, res: Response) => {
  await prisma.profile.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(204).send();
});