import React from 'react';
import SocialNetwork from './SocialNetwork';
import IndividualProfile from '../../Individual_profile.json';
const socialNetworks = IndividualProfile.social_networks;

export default function ContactInformation() {
  return (
    <section className="pb-2 mt-4 mb-0 first:mt-0">
      {/* To keep in the same column */}
      <section className="break-inside-avoid">
        <section className="pb-4 mb-2 border-b-4 border-gray-300 break-inside-avoid">
          <ul className="pr-7 list-inside">
            {socialNetworks.map((socialNetwork, index) => (
              <>
                <SocialNetwork
                  name={socialNetwork.name}
                  socialNetworkLink={socialNetwork.socialNetworkLink}
                  displayName={socialNetwork.displayName}
                />
              </>
            ))}
          </ul>
        </section>
      </section>
    </section>
  );
}
