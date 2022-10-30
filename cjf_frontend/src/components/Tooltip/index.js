import { Tooltip, withStyles } from '@material-ui/core';
import React from 'react'

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 12,
    },
  }))(Tooltip);

export const TooltipLight = (props) => {
  return (
    <LightTooltip placement={props.placement} title={props.title}>
        {props.children}
        </LightTooltip>
  )
}
