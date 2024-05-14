import React, { useMemo } from 'react';
import { usePrintModeStore } from '@/store';
import SocialNetwork from './SocialNetwork';
import SocialNetWorkModal from './SocialNetWorkModal';
import { useFetchData } from '@/app/hooks/useFetchData';
import LoadingAndError from '../../Common/LoadingAndError';

function DisplaySection({ socialNetworks, isLoading, error, isError }) {
  if (isLoading) {
    return <LoadingAndError title="Social Networks" isError={false} />;
  }

  if (isError) {
    return <LoadingAndError title={error.message} isError={isError} />;
  }

  return (
    <section className="break-inside-avoid">
      <section className="pb-4 mb-2 border-b-4 border-gray-300 break-inside-avoid">
        <ul className="pr-7 list-inside">
          {socialNetworks.map((socialNetwork, index) => (
            <div key={index}>
              {socialNetwork.name &&
                socialNetwork.link &&
                socialNetwork.displayName && (
                  <SocialNetwork
                    name={socialNetwork.name}
                    socialNetworkLink={socialNetwork.link}
                    displayName={socialNetwork.displayName}
                  />
                )}
            </div>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default function ContactInformation() {
  const {
    data: socialNetworks = [],
    isLoading,
    error,
    isError,
    isFetching,
    refetch,
  } = useFetchData('social_networks');
  const { isPrintMode } = usePrintModeStore(state => state);

  const showSocialNetWorkModal = useMemo(() => {
    return !isError && !isLoading && !isPrintMode;
  }, [socialNetworks, isPrintMode]);

  return (
    <section className="relative pb-2 mt-4 mb-0 first:mt-0">
      {showSocialNetWorkModal && <SocialNetWorkModal title="Social Network" />}
      {/* To keep in the same column */}
      <DisplaySection
        socialNetworks={socialNetworks}
        isLoading={isLoading}
        error={error}
        isError={isError}
      />
    </section>
  );
}
