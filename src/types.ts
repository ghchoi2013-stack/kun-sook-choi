/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AdminResource {
  id: string;
  title: string;
  category: 'dream' | 'idea' | 'sound' | 'object';
  description: string;
  price?: string;
  date: string;
}

export interface SiteConfig {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryColor: string;
  accentColor: string;
}
