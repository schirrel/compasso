'use client';

import { useEffect } from 'react';

export function DesignSystemLoader() {
  useEffect(() => {
    void import('@compasso/design-system');
  }, []);

  return null;
}
