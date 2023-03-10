import { ReactNode, useEffect, useState } from "react"
import {
  Divider,
  Button,
  Typography,
  CardContent,
  Card,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
  Box,
  Link,
} from "@mui/material"
import Image from "next/image"

import { useStore } from "../../store"
import TransactionProcessingModal from "./TransactionProcessingModal"
import { ChainSelect } from "./ChainSelect"
import TokenCard from "./TokenCard"
import { Fees } from "./Fees"
import ApprovalModal from "./ApprovalModal"
import LoadingButton from "@mui/lab/LoadingButton"
import RoutingModal from "./RoutingModal"
import { useHistory } from "../../store/history.store"
import { chainName } from "../../helpers/chainName"

export default function Borrow() {
  const theme = useTheme()
  const address = useStore((state) => state.address)
  const walletChain = useStore((state) => state.chain)
  const changeChain = useStore((state) => state.changeChain)
  const updateBalance = useStore((state) => state.updateBalances)
  const updateVault = useStore((state) => state.updateVault)
  const updateAllowance = useStore((state) => state.updateAllowance)
  useEffect(() => {
    if (address) {
      updateBalance("collateral")
      updateBalance("debt")
      updateAllowance()
      updateVault()
    }
  }, [address, updateBalance, updateAllowance, updateVault])

  const login = useStore((state) => state.login)

  const collateral = useStore((state) => state.position.collateral)
  const collateralChainId = useStore((state) => state.collateralChainId)
  const collateralAllowance = useStore((state) => state.collateralAllowance)
  const debt = useStore((state) => state.position.debt)
  const debtChainId = useStore((state) => state.debtChainId)
  const changeBorrowChain = useStore((state) => state.changeBorrowChain)
  const changeCollateralChain = useStore((state) => state.changeCollateralChain)

  // TODO: refacto with a "status" in store (i.e status = "editing, approving, signing, borrowing...") ?
  const [showApprovalModal, setShowApprovalModal] = useState(false)

  const value = useStore((state) => state.position.collateral.amount)
  const balance = useStore(
    (state) => state.collateralBalances[state.position.collateral.token.symbol]
  )

  const updateTokenPrice = useStore((state) => state.updateTokenPrice)
  useEffect(() => {
    updateTokenPrice("collateral")
    updateTokenPrice("debt")
  }, [updateTokenPrice])

  const ltv = useStore((state) => state.position.ltv)
  const ltvMax = useStore((state) => state.position.ltvMax)

  const signAndBorrow = useStore((state) => state.signAndBorrow)
  const isSigning = useStore((state) => state.isSigning)
  const isBorrowing = useStore((state) => state.isBorrowing)

  const currentTxHash = useHistory((state) => state.inModal)
  const closeModal = useHistory((state) => state.closeModal)
  const metaStatus = useStore((state) => state.transactionMeta.status)
  const availableVaultStatus = useStore((state) => state.availableVaultsStatus)

  const [showRoutingModal, setShowRoutingModal] = useState(false)
  const onMobile = useMediaQuery(theme.breakpoints.down("md"))

  let button: ReactNode
  if (!address) {
    button = (
      <Button
        variant="gradient"
        size="large"
        onClick={() => login()}
        fullWidth
        data-cy="borrow-login"
      >
        Connect wallet
      </Button>
    )
  } else if (collateralChainId !== walletChain?.id) {
    button = (
      <Button
        variant="gradient"
        size="large"
        fullWidth
        onClick={() => changeChain(collateral.token.chainId)}
      >
        Switch network
      </Button>
    )
  } else if (value > 0 && value > balance) {
    button = (
      <Button variant="gradient" size="large" disabled fullWidth>
        Insufficient {collateral.token.symbol} balance
      </Button>
    )
  } else if (ltv > ltvMax) {
    button = (
      <Button variant="gradient" size="large" disabled fullWidth>
        Not enough collateral
      </Button>
    )
  } else if (
    collateralAllowance?.value !== undefined &&
    collateralAllowance.value < collateral.amount
  ) {
    button = (
      <Button
        variant="gradient"
        fullWidth
        size="large"
        onClick={() => setShowApprovalModal(true)}
      >
        Allow
      </Button>
    )
  } else {
    button = (
      <LoadingButton
        variant="gradient"
        onClick={signAndBorrow}
        size="large"
        fullWidth
        disabled={
          collateral.amount <= 0 || debt.amount <= 0 || metaStatus !== "ready"
        }
        loading={
          isSigning || isBorrowing || availableVaultStatus === "fetching"
        }
        loadingPosition="start"
        startIcon={<></>}
      >
        {(isSigning && "(1/2) Signing...") ||
          (isBorrowing && "(2/2) Borrowing...") ||
          "Sign & Borrow"}
      </LoadingButton>
    )
  }

  return (
    <>
      <Card sx={{ maxWidth: "500px", margin: "auto" }}>
        <CardContent sx={{ width: "100%", p: "1.5rem 2rem" }}>
          <Typography variant="body2" height="40px" lineHeight="40px">
            Borrow
          </Typography>

          <Divider sx={{ mt: "1rem", mb: "0.5rem" }} />

          <Box mb="1rem">
            <ChainSelect
              label="Collateral from"
              type="collateral"
              value={collateralChainId}
              disabled={isBorrowing}
              onChange={(chainId) => changeCollateralChain(chainId)}
            />
            <TokenCard type="collateral" />
          </Box>

          <Box>
            <ChainSelect
              label="Borrow to"
              type="borrow"
              value={debtChainId}
              disabled={isBorrowing}
              onChange={(chainId) => changeBorrowChain(chainId)}
            />
            <TokenCard type="debt" />
          </Box>

          <Stack
            direction="row"
            m="1rem 0"
            justifyContent="space-between"
            onClick={() => {
              !onMobile && address && setShowRoutingModal(true)
            }}
            sx={{ cursor: address && "pointer" }}
          >
            <Typography variant="small">Route</Typography>
            <Typography variant="small">
              <u>
                {`${collateral.token.symbol} > ${chainName(
                  debt.token.chainId
                )}`}
              </u>
            </Typography>
          </Stack>
          <Box mb="1rem">
            <Fees />
          </Box>

          {button}

          <Link
            href="https://www.connext.network/"
            target="_blank"
            rel="noreferrer"
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              mt="2rem"
            >
              <Typography variant="small">Powered by</Typography>
              <Image
                src="/assets/images/logo/connext-title.svg"
                height={16}
                width={95}
                alt="Connext logo"
              />
            </Grid>
          </Link>
        </CardContent>
      </Card>
      {/* TODO: Move txprocessing outside of borrow */}
      <TransactionProcessingModal
        hash={currentTxHash}
        handleClose={closeModal}
      />
      {showApprovalModal && (
        <ApprovalModal handleClose={() => setShowApprovalModal(false)} />
      )}

      <RoutingModal
        open={showRoutingModal}
        handleClose={() => setShowRoutingModal(false)}
      />
    </>
  )
}
