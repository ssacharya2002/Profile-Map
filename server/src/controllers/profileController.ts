import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../lib/prisma';
import { ProfileData } from '../types/profile';

// Get all profiles
export const getProfiles = asyncHandler(async (req: Request, res: Response) => {
  const profiles = await prisma.profile.findMany();
  res.json(profiles);
});

// Get single profile
export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const profile = await prisma.profile.findUnique({
    where: {
      id: req.params.id,
    }
  });

  if (!profile) {
    res.status(404);
    throw new Error('Profile not found');
  }

  res.json(profile);
});

// Create profile
export const createProfile = asyncHandler(async (req: Request, res: Response) => {
  const profileData: ProfileData = req.body;

  // Type-safe way to check required fields
  if (!profileData.name || !profileData.photo || !profileData.description ||
    !profileData.address || !profileData.latitude || !profileData.longitude ||
    !profileData.email || !profileData.phone || !profileData.interests) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  // Simply convert latitude and longitude to numbers
  profileData.latitude = Number(profileData.latitude);
  profileData.longitude = Number(profileData.longitude);

  // Validate interests is an array
  if (!Array.isArray(profileData.interests)) {
    res.status(400);
    throw new Error('Interests must be an array');
  }

  // Validate interests array contains only strings
  if (!profileData.interests.every(interest => typeof interest === 'string')) {
    res.status(400);
    throw new Error('All interests must be strings');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(profileData.email)) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  try {
    const profile = await prisma.profile.create({
      data: profileData
    });
    res.status(201).json(profile);
  } catch (error: any) {
    res.status(400);
    throw new Error('Error creating profile: ' + error.message);
  }
});

// Update profile
export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const profileData: Partial<ProfileData> = req.body;

  // Check if profile exists
  const existingProfile = await prisma.profile.findUnique({
    where: { id }
  });

  if (!existingProfile) {
    res.status(404);
    throw new Error('Profile not found');
  }

  // Convert latitude and longitude to numbers if provided
  if (profileData.latitude !== undefined) {
    profileData.latitude = Number(profileData.latitude);
  }
  if (profileData.longitude !== undefined) {
    profileData.longitude = Number(profileData.longitude);
  }

  // Validate interests if provided
  if (profileData.interests !== undefined) {
    if (!Array.isArray(profileData.interests)) {
      res.status(400);
      throw new Error('Interests must be an array');
    }

    if (!profileData.interests.every(interest => typeof interest === 'string')) {
      res.status(400);
      throw new Error('All interests must be strings');
    }
  }

  // Validate email format if provided
  if (profileData.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      res.status(400);
      throw new Error('Invalid email format');
    }
  }

  try {
    const updatedProfile = await prisma.profile.update({
      where: { id },
      data: profileData,
    });
    res.json(updatedProfile);
  } catch (error: any) {
    res.status(400);
    throw new Error('Error updating profile: ' + error.message);
  }
});

// Delete profile
export const deleteProfile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if profile exists
  const existingProfile = await prisma.profile.findUnique({
    where: { id }
  });

  if (!existingProfile) {
    res.status(404);
    throw new Error('Profile not found');
  }

  try {
    await prisma.profile.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400);
    throw new Error('Error deleting profile: ' + error.message);
  }
});