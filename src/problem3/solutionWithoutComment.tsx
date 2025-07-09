type BlockchainTypes =
  | "Osmosis"
  | "Ethereum"
  | "Arbitrum"
  | "Zilliqa"
  | "Neo"
  | (string & {});

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: BlockchainTypes;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number;
}

interface WalletPageProps extends BoxProps {}

const WalletPage: React.FC<WalletPageProps> = (props: WalletPageProps) => {
  const { ...rest } = props;
  const balances: WalletBalance[] = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: BlockchainTypes): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const getUsdValue = (balance: WalletBalance): number => {
    return prices[balance.currency] * balance.amount;
  };

  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .map((item) => {
        const formattedItem: FormattedWalletBalance = {
          ...item,
          formatted: item.amount.toFixed(),
          priority: getPriority(item.blockchain),
        };
        return formattedItem;
      })
      .filter((balance: FormattedWalletBalance) => {
        return balance.priority > -99 && balance.amount > 0;
      })
      .sort((lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) => {
        return rhs.priority - lhs.priority;
      });
  }, [balances]);

  const rows = useMemo(
    () =>
      formattedBalances.map(
        (balance: FormattedWalletBalance, index: number) => {
          return (
            <WalletRow
              className={classes.row}
              key={index}
              amount={balance.amount}
              usdValue={getUsdValue(balance)}
              formattedAmount={balance.formatted}
            />
          );
        }
      ),
    [formattedBalances, prices]
  );

  return <div {...rest}>{rows}</div>;
};
