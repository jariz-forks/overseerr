import React from 'react';
import useSWR from 'swr';
import type { PublicSettingsResponse } from '../../server/interfaces/api/settingsInterfaces';

export interface SettingsContextProps {
  currentSettings: PublicSettingsResponse;
}

const defaultSettings = {
  initialized: false,
  applicationTitle: 'Overseerr',
  applicationUrl: '',
  hideAvailable: false,
  localLogin: true,
  movie4kEnabled: false,
  series4kEnabled: false,
  region: '',
  originalLanguage: '',
  partialRequestsEnabled: true,
  cacheImages: false,
  vapidPublic: '',
  enablePushRegistration: false,
  locale: 'en',
  emailEnabled: false,
  newPlexLogin: true,
};

export const SettingsContext = React.createContext<SettingsContextProps>({
  currentSettings: defaultSettings,
});

export const SettingsProvider: React.FC<SettingsContextProps> = ({
  children,
  currentSettings,
}) => {
  const { data, error } = useSWR<PublicSettingsResponse>(
    '/api/v1/settings/public',
    { fallbackData: currentSettings }
  );

  let newSettings = defaultSettings;

  if (data && !error) {
    newSettings = data;
  }

  return (
    <SettingsContext.Provider value={{ currentSettings: newSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
