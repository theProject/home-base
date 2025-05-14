// File: app/(payload)/admin/layout.tsx
'use client';

import React from 'react';
import config from '../../../payload.config';
import '@payloadcms/next/css';              // make sure styles load
import { PayloadProvider } from '@payloadcm';

export default function PayloadAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PayloadProvider config={config}>
      {children}
    </PayloadProvider>
  );
}
