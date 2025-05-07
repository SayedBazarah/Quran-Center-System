'use client';

import type { ThemeColorScheme } from 'src/theme/types';

import { useEffect, useCallback } from 'react';
import { hasKeys, varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/material/styles';

import { settingIcons } from './icons';
import { Iconify } from '../../iconify';
import { BaseOption } from './base-option';
import { Scrollbar } from '../../scrollbar';
import { SmallBlock, LargeBlock } from './styles';
import { FullScreenButton } from './fullscreen-button';
import { NavLayoutOptions } from './nav-layout-option';
import { useSettingsContext } from '../context/use-settings-context';

import type { SettingsDrawerProps } from '../types';

// ----------------------------------------------------------------------

export function SettingsDrawer({ sx, defaultSettings }: SettingsDrawerProps) {
  const settings = useSettingsContext();

  const { mode, setMode, systemMode } = useColorScheme();

  useEffect(() => {
    if (mode === 'system' && systemMode) {
      settings.setState({ colorScheme: systemMode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, systemMode]);

  // Visible options by default settings
  const isCompactLayoutVisible = hasKeys(defaultSettings, ['compactLayout']);
  const isColorSchemeVisible = hasKeys(defaultSettings, ['colorScheme']);
  const isContrastVisible = hasKeys(defaultSettings, ['contrast']);
  const isNavColorVisible = hasKeys(defaultSettings, ['navColor']);
  const isNavLayoutVisible = hasKeys(defaultSettings, ['navLayout']);

  const handleReset = useCallback(() => {
    settings.onReset();
    setMode(defaultSettings.colorScheme as ThemeColorScheme);
  }, [defaultSettings.colorScheme, setMode, settings]);

  const renderHead = () => (
    <Box
      sx={{
        py: 2,
        pr: 1,
        pl: 2.5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        الاعدادات
      </Typography>

      <FullScreenButton />

      <Tooltip title="ظبط المصنع">
        <IconButton onClick={handleReset}>
          <Badge color="error" variant="dot" invisible={!settings.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="اغلاق">
        <IconButton onClick={settings.onCloseDrawer}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderMode = () => (
    <BaseOption
      label="ليلي"
      selected={settings.state.colorScheme === 'dark'}
      icon={<SvgIcon>{settingIcons.moon}</SvgIcon>}
      onChangeOption={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
        settings.setState({ colorScheme: mode === 'light' ? 'dark' : 'light' });
      }}
    />
  );

  const renderContrast = () => (
    <BaseOption
      label="حده الالوان"
      selected={settings.state.contrast === 'hight'}
      icon={<SvgIcon>{settingIcons.contrast}</SvgIcon>}
      onChangeOption={() =>
        settings.setState({
          contrast: settings.state.contrast === 'default' ? 'hight' : 'default',
        })
      }
    />
  );

  const renderCompact = () => (
    <BaseOption
      tooltip="تكبير الشاشة"
      label="تكبير الشاشة"
      selected={!!settings.state.compactLayout}
      icon={<SvgIcon>{settingIcons.autofitWidth}</SvgIcon>}
      onChangeOption={() => settings.setState({ compactLayout: !settings.state.compactLayout })}
    />
  );

  const renderNav = () => (
    <LargeBlock title="الهيكل" tooltip="Dashboard only" sx={{ gap: 2.5 }}>
      {isNavLayoutVisible && (
        <SmallBlock
          label="الهيكل"
          canReset={settings.state.navLayout !== defaultSettings.navLayout}
          onReset={() => settings.setState({ navLayout: defaultSettings.navLayout })}
        >
          <NavLayoutOptions
            value={settings.state.navLayout}
            onChangeOption={(newOption) => settings.setState({ navLayout: newOption })}
            options={[
              {
                value: 'vertical',
                icon: (
                  <SvgIcon sx={{ width: 1, height: 'auto' }}>{settingIcons.navVertical}</SvgIcon>
                ),
              },
              {
                value: 'horizontal',
                icon: (
                  <SvgIcon sx={{ width: 1, height: 'auto' }}>{settingIcons.navHorizontal}</SvgIcon>
                ),
              },
              {
                value: 'mini',
                icon: <SvgIcon sx={{ width: 1, height: 'auto' }}>{settingIcons.navMini}</SvgIcon>,
              },
            ]}
          />
        </SmallBlock>
      )}
    </LargeBlock>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.openDrawer}
      onClose={settings.onCloseDrawer}
      slotProps={{
        backdrop: { invisible: true },
        paper: {
          sx: [
            (theme) => ({
              ...theme.mixins.paperStyles(theme, {
                color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
              }),
              width: 360,
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ],
        },
      }}
    >
      {renderHead()}

      <Scrollbar>
        <Box
          sx={{
            pb: 5,
            gap: 6,
            px: 2.5,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ gap: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {isColorSchemeVisible && renderMode()}
            {isContrastVisible && renderContrast()}
            {isCompactLayoutVisible && renderCompact()}
          </Box>

          {(isNavColorVisible || isNavLayoutVisible) && renderNav()}
        </Box>
      </Scrollbar>
    </Drawer>
  );
}
