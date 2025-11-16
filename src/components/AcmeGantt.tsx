import React, { useMemo } from 'react';
import { app, authentication } from '@microsoft/teams-js';
import { useData } from './sample/lib/useData';
import Gantt from '../components/Gantt';
import axios from 'axios';
import config from './sample/lib/config';

export default function AcmeGantt() {
    const { data } = useData(async() => {
        await app.initialize();

        try {
            // Get SSO token from Teams
            const ssoToken = await authentication.getAuthToken({
                resources : ['User.Read']
            });

            // Call backend Azure Function which does OBO flow to get Graph API data
            const apiBaseUrl = config.apiEndpoint + '/api/';
            const apiClient = axios.create({ baseURL : apiBaseUrl });
            apiClient.interceptors.request.use(async(config) => {
                config.headers['Authorization'] = `Bearer ${ssoToken}`;
                return config;
            });

            const response = await apiClient.get('getUserProfile');

            // Backend returns user profile in graphClientMessage
            return { profile : response.data.graphClientMessage };
        }
        catch (error) {
            console.error('Failed to get user profile from backend:', error);
            throw error;
        }
    });

    // Derive role from data instead of using state
    const readOnly = useMemo(() => {
        if (data?.profile) {
            return data.profile.jobTitle === 'manager' ? false : true;
        }
        return true;
    }, [data]);

    return (
        <div>
            <Gantt readOnly={readOnly} />
        </div>
    );
}
