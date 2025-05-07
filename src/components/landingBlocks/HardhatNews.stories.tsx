import React from 'react';
import HardhatNews from './HardhatNews';

export default {
  title: 'Landing Blocks/Hardhat News',
};

const mockContent = {
  title: 'Latest Hardhat News',
};

export const Default = () => <HardhatNews content={mockContent} />;
