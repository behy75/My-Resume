import React from 'react';
import { usePrintModeStore } from '@/store';
import { useContactInformation } from '@/store/useContactInformation';
import SocialNetwork from './SocialNetwork';
import SocialNetWorkModal from './SocialNetWorkModal';

export default function ContactInformation() {
  const { isPrintMode } = usePrintModeStore(state => state);
  const { webSite, linkedin, gitHub, email, phone } = useContactInformation(
    state => state
  );
  const socialNetworks = [webSite, linkedin, gitHub, email, phone];

  return (
    <section className="relative pb-2 mt-4 mb-0 first:mt-0">
      {!isPrintMode && <SocialNetWorkModal title="Social Network" />}
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <section className="pb-4 mb-2 border-b-4 border-gray-300 break-inside-avoid">
          <ul className="pr-7 list-inside">
            {socialNetworks.map((socialNetwork, index) => (
              <>
                {socialNetwork.name &&
                  socialNetwork.link &&
                  socialNetwork.displayName && (
                    <SocialNetwork
                      name={socialNetwork.name}
                      socialNetworkLink={socialNetwork.link}
                      displayName={socialNetwork.displayName}
                    />
                  )}
              </>
            ))}
          </ul>
        </section>
      </section>
    </section>
  );
}
