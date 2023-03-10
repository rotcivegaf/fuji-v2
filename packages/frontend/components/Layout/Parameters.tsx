import React from "react"
import { Menu, MenuList, useTheme } from "@mui/material"
import Chip from "@mui/material/Chip"
import CloseIcon from "@mui/icons-material/Close"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import ParameterLinks from "./ParameterLinks"

export default function Parameters() {
  const { palette } = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)

  const openMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  return (
    <>
      <Chip
        label={isOpen ? <CloseIcon /> : <MoreHorizIcon />}
        onClick={openMenu}
      />
      <Menu
        id="paramters-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1 }}
        PaperProps={{ sx: { background: palette.secondary.contrastText } }}
      >
        <MenuList sx={{ minWidth: "200px" }} disablePadding>
          <ParameterLinks />
        </MenuList>
      </Menu>
    </>
  )
}
