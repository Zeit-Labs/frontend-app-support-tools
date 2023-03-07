/* eslint-disable react/prop-types */
import { renderWithRouter } from '@edx/frontend-enterprise-utils';
import { fireEvent, screen } from '@testing-library/react';
import { ProvisioningContext, initialStateValue } from '../../../testData';
import PROVISIONING_PAGE_TEXT from '../../data/constants';
import ProvisioningFormAccountType from '../ProvisioningFormAccountType';

const { ACCOUNT_CREATION } = PROVISIONING_PAGE_TEXT.FORM;

const ProvisioningFormAccountTypeWrapper = ({
  value = initialStateValue,
}) => (
  <ProvisioningContext value={value}>
    <ProvisioningFormAccountType />
  </ProvisioningContext>
);

describe('ProvisioningFormAccountType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders', () => {
    renderWithRouter(<ProvisioningFormAccountTypeWrapper />);

    expect(screen.getByText(ACCOUNT_CREATION.TITLE)).toBeTruthy();

    const accountTypeOptions = Object.keys(ACCOUNT_CREATION.OPTIONS);
    // Checks value for each radio input label
    for (let i = 0; i < accountTypeOptions.length; i++) {
      expect(screen.getByText(ACCOUNT_CREATION.OPTIONS[accountTypeOptions[i]])).toBeTruthy();
    }
  });
  it('switches active account type', () => {
    renderWithRouter(<ProvisioningFormAccountTypeWrapper />);

    const accountTypeOptions = Object.keys(ACCOUNT_CREATION.OPTIONS);
    const accountTypeButtons = [];
    // Retrieves a list of input elements based on test ids
    for (let i = 0; i < accountTypeOptions.length; i++) {
      accountTypeButtons.push(screen.getByTestId(ACCOUNT_CREATION.OPTIONS[accountTypeOptions[i]]));
    }
    // Clicks on each input element and checks if it is checked
    for (let i = 0; i < accountTypeButtons.length; i++) {
      fireEvent.click(accountTypeButtons[i]);
      expect(accountTypeButtons[i].checked).toBeTruthy();
    }
  });
  it('sets provisioning context value to false', () => {
    renderWithRouter(<ProvisioningFormAccountTypeWrapper />);

    const singleTestId = screen.getByTestId(ACCOUNT_CREATION.OPTIONS.single);
    fireEvent.click(singleTestId);

    expect(screen.getByTestId(ACCOUNT_CREATION.OPTIONS.single)).toBeTruthy();
  });
});
