---
title: Setting Up Hubris on stm32f4-discovery
description: Setting up a Windows environment to use Hubris with an stm32f4-discovery board.
img: https://images.unsplash.com/photo-1588010986054-727675e6f36a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60
alt: my third blog post
date: 09/26/22
---


# notes

- Install rustup
- Install OpenOCD, windows binaries on GitHub https://github.com/openocd-org/openocd/releases
```
- Download the binary zip file for Windows.
- Extract into the C:\openocd-0.10.0 folder.
- Add the path: C:\openocd-0.10.0\bin to your Windows User Path environment variable. Note: You must add bin to the path.
- Check the OpenOCD version you are using. Open a new MinGW terminal and run the following commands:
Note: You must start a new MinGW terminal to inherit the new Path values.
```
```
$ which openocd
/c/openocd-0.10.0/bin/openocd
$ openocd -v
Open On-Chip Debugger 0.10.0
Licensed under GNU GPL v2
For bug reports, read
        http://openocd.org/doc/doxygen/bugs.html
```
cts note: i used powershell, `which` doesn't work but `openocd -v` does

- download arm gnu toolchain: https://developer.arm.com/Tools%20and%20Software/GNU%20Toolchain
- Download and install usb driver from ST here: https://www.st.com/en/development-tools/stsw-link009.html?rt=tn&id=TN1235
- pull down humility repo: https://github.com/oxidecomputer/humility
  - debugger for hubris
  - install required `cargo install cargo-readme`
  - enter humility/ folder
  - `cargo build  --release`
  - will download and install required components, compile, 
  - create env variable `HUBRIS_HUMILITY_PATH` point to exe file path: `humility/target/release/humility.exe`
- pull down repo: https://github.com/oxidecomputer/hubris
- enter hubris/ folder
- run build command for STMDiscovery: `cargo xtask dist app/demo-stm32f4-discovery/app.toml`
  - cargo will download and install required components, pull dependent git repos and submodules
  - will compile
  - will build
  - will link
  - will copy linked binary
- plug in USB of stm32f4-discovery board
- flash: `cargo xtask flash app/demo-stm32f4-discovery/app.toml`
```
Finished release [optimized + debuginfo] target(s) in 3.15s
target\demo-stm32f4-discovery\dist\kernel (unchanged)
flash = 0x08000000..0x08040000
ram   = 0x20000000..0x2001c000
Used:
  flash: 0x10000 (25%)
  ram:   0x8000 (28%)
humility: attaching with chip set to "STM32F407VGTx"
humility: attached via ST-Link V2-1
humility: flashing done
```
- run humility debugger to view running tasks: `cargo xtask humility app/demo-stm32f4-discovery/app.toml -- tasks`
```
PS D:\Devel\Rust\hubris> cargo xtask humility app/demo-stm32f4-discovery/app.toml -- tasks
    Finished dev [optimized + debuginfo] target(s) in 3.43s
     Running `target\debug\xtask.exe humility app/demo-stm32f4-discovery/app.toml -- tasks`
humility: attached via ST-Link V2-1
system time = 323298
ID TASK                 GEN PRI STATE
 0 jefe                   0   0 recv, notif: bit0 bit1(T+2)
 1 rcc_driver             0   1 recv
 2 usart_driver           0   2 RUNNING
 3 user_leds              0   2 recv
 4 ping                2241   4 wait: reply from usart_driver/gen0
 5 pong                   0   3 recv, notif: bit0(T+202)
 6 hiffy                  0   3 notif: bit31(T+180)
 7 idle                   0   5 ready
```
- run hubris kernel tests: `cargo xtask test test/tests-stm32fx/app.toml`
  - in my case a test was failing
```
    Finished release [optimized + debuginfo] target(s) in 3.12s
target\tests-stm32fx\dist\kernel (unchanged)
flash = 0x08000000..0x08040000
ram   = 0x20000000..0x2001c000
Used:
  flash: 0x29080 (64%)
  ram:   0x4500 (15%)
humility: attaching with chip set to "STM32F407VGTx"
humility: attached via ST-Link V2-1
humility: archive appears to be already flashed; forcing re-flash
humility: flashing done
humility: attached via ST-Link V2-1
humility: TPIU sync packet found at offset 1
humility: ITM synchronization packet found at offset 12
humility: expecting 50 cases
humility: running test_send ... ok
humility: running test_recv_reply ... ok
humility: running test_recv_reply_fault ... ok
humility: running test_floating_point_lowregs ... ok
humility: running test_floating_point_highregs ... ok
humility: running test_floating_point_fault ... ok
humility: running test_fault_badmem ... ok
humility: running test_fault_stackoverflow ... ok
humility: running test_fault_execdata ... fail
humility: running test_fault_illop ... ok
humility: running test_fault_nullexec ... ok
humility: running test_fault_textoob ... ok
humility: running test_fault_stackoob ... ok
humility: running test_fault_buserror ... ok
humility: running test_fault_illinst ... ok
humility: running test_fault_divzero ... ok
humility: running test_fault_maxstatus ... ok
humility: running test_fault_badstatus ... ok
humility: running test_fault_maxrestart ... ok
humility: running test_fault_badrestart ... ok
humility: running test_fault_maxinjection ... ok
humility: running test_fault_badinjection ... ok
humility: running test_fault_superinjection ... ok
humility: running test_fault_selfinjection ... ok
humility: running test_panic ... ok
humility: running test_restart ... ok
humility: running test_restart_taskgen ... ok
humility: running test_borrow_info ... ok
humility: running test_borrow_read ... ok
humility: running test_borrow_write ... ok
humility: running test_borrow_without_peer_waiting ... ok
humility: running test_supervisor_fault_notification ... ok
humility: running test_timer_advance ... ok
humility: running test_timer_notify ... ok
humility: running test_timer_notify_past ... ok
humility: running test_task_config ... ok
humility: running test_task_status ... ok
humility: running test_task_fault_injection ... ok
humility: running test_refresh_task_id_basic ... ok
humility: running test_refresh_task_id_off_by_one ... ok
humility: running test_refresh_task_id_off_by_many ... ok
humility: running test_post ... ok
humility: running test_idol_basic ... ok
humility: running test_idol_bool_arg ... ok
humility: running test_idol_bool_ret ... ok
humility: running test_idol_bool_xor ... ok
humility: running test_idol_err_ret ... ok
humility: running test_idol_ssmarshal ... ok
humility: running test_idol_ssmarshal_multiarg ... ok
humility: running test_idol_ssmarshal_multiarg_enum ... ok
humility: tests completed: fail
humility: test output dumped to hubris.testout.1
Error: humility failed
```



# troubleshooting
- check openocd can connect to device: `openocd.exe -f interface/stlink.cfg -f target/stm32f4x.cfg`
```
PS D:\Devel\Rust\hubris> openocd.exe -f interface/stlink.cfg -f target/stm32f4x.cfg
Open On-Chip Debugger 0.12.0-rc1 (2022-09-18-17:56)
Licensed under GNU GPL v2
For bug reports, read
        http://openocd.org/doc/doxygen/bugs.html
Info : auto-selecting first available session transport "hla_swd". To override use 'transport select <transport>'.
Info : The selected transport took over low-level target control. The results might differ compared to plain JTAG/SWD
Info : Listening on port 6666 for tcl connections
Info : Listening on port 4444 for telnet connections
Info : clock speed 2000 kHz
Info : STLINK V2J25M14 (API v2) VID:PID 0483:374B
Info : Target voltage: 2.905263
Info : [stm32f4x.cpu] Cortex-M4 r0p1 processor detected
Info : [stm32f4x.cpu] target has 6 breakpoints, 4 watchpoints
Info : starting gdb server for stm32f4x.cpu on 3333
Info : Listening on port 3333 for gdb connections
```
- firmware out of date
```
humility: attaching with chip set to "STM32F407VGTx"
humility flash failed: The firmware on the probe is outdated
Error: humility failed
```
download STSW-LINK007 to update firmware: https://www.st.com/en/development-tools/stsw-link007.html
 - click device connect
