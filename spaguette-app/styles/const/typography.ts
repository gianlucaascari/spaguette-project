type FontWeight = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

const WEIGHTS: {
    titleWeight: FontWeight;
    subtitleWeight: FontWeight;
    bodyWeight: FontWeight;
    buttonWeight: FontWeight;
  } = {
    titleWeight: '700',
    subtitleWeight: '600',
    bodyWeight: '400',
    buttonWeight: '600',
  };

export const TYPOGRAPHY = {
    titleSize: 24,
    subtitleSize: 18,
    bodySize: 14,
    buttonSize: 14,
    ...WEIGHTS,
};
  