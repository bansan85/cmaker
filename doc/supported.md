# Supported features

## Comments

Following lists are based on v4.2.0-rc3.

`Supported` means `Added based on doc CMake vX.Y`.

## cmake-commands

https://cmake.org/cmake/help/latest/manual/cmake-commands.7.html

### Scripting Commands

| Command | Supported | Remarks |
| - | - | - |
| block | - | |
| break | - | |
| cmake_host_system_information | - | |
| cmake_language | - | |
| cmake_minimum_required | - | |
| cmake_parse_arguments | - | |
| cmake_path | - | |
| cmake_pkg_config | - | |
| cmake_policy | - | |
| configure_file | - | |
| continue | - | |
| else | - | |
| elseif | - | |
| endblock | - | |
| endforeach | - | |
| endfunction | - | |
| endif | - | |
| endmacro | - | |
| endwhile | - | |
| execute_process | - | |
| file | - | |
| find_file | - | |
| find_library | - | |
| find_package | - | |
| find_path | - | |
| find_program | - | |
| foreach | - | |
| function | - | |
| get_cmake_property | - | |
| get_directory_property | - | |
| get_filename_component | - | |
| get_property | - | |
| if | - | |
| include | - | |
| include_guard | - | |
| list | - | |
| load_cache | - | |
| macro | - | |
| mark_as_advanced | - | |
| math | - | |
| message | - | |
| option | - | |
| return | - | |
| separate_arguments | - | |
| set | - | |
| set_directory_properties | - | |
| set_property | - | |
| site_name | - | |
| string | - | |
| unset | - | |
| variable_watch | - | |
| while | - | |

### Project Commands

| Command | Supported | Remarks |
| - | - | - |
| add_compile_definitions | - | |
| add_compile_options | - | |
| add_custom_command | - | |
| add_custom_target | - | |
| add_definitions | - | |
| add_dependencies | - | |
| add_executable | - | |
| add_library | - | |
| add_link_options | - | |
| add_subdirectory | - | |
| add_test | - | |
| aux_source_directory | - | |
| build_command | - | |
| cmake_file_api | - | |
| cmake_instrumentation | - | |
| create_test_sourcelist | - | |
| define_property | - | |
| enable_language | - | |
| enable_testing | - | |
| export | - | |
| fltk_wrap_ui | - | |
| get_source_file_property | - | |
| get_target_property | - | |
| get_test_property | - | |
| include_directories | - | |
| include_external_msproject | - | |
| include_regular_expression | - | |
| install | - | |
| link_directories | - | |
| link_libraries | - | |
| project | 4.2 | |
| remove_definitions | - | |
| set_source_files_properties | - | |
| set_target_properties | - | |
| set_tests_properties | - | |
| source_group | - | |
| target_compile_definitions | - | |
| target_compile_features | - | |
| target_compile_options | - | |
| target_include_directories | - | |
| target_link_directories | - | |
| target_link_libraries | - | |
| target_link_options | - | |
| target_precompile_headers | - | |
| target_sources | - | |
| try_compile | - | |
| try_run | - | |

### CTest Commands

| Command | Supported | Remarks |
| - | - | - |
| ctest_build | - | |
| ctest_configure | - | |
| ctest_coverage | - | |
| ctest_empty_binary_directory | - | |
| ctest_memcheck | - | |
| ctest_read_custom_files | - | |
| ctest_run_script | - | |
| ctest_sleep | - | |
| ctest_start | - | |
| ctest_submit | - | |
| ctest_test | - | |
| ctest_update | - | |
| ctest_upload | - | |

## Environment variables

https://cmake.org/cmake/help/latest/manual/cmake-env-variables.7.html

### Environment Variables that Change Behavior

| Command | Supported | Remarks |
| - | - | - |
| CLICOLOR | - | |
| CLICOLOR_FORCE | - | |
| CMAKE_APPBUNDLE_PATH | - | |
| CMAKE_FRAMEWORK_PATH | - | |
| CMAKE_INCLUDE_PATH | - | |
| CMAKE_LIBRARY_PATH | - | |
| CMAKE_MAXIMUM_RECURSION_DEPTH | - | |
| CMAKE_POLICY_VERSION_MINIMUM | - | |
| CMAKE_PREFIX_PATH | - | |
| CMAKE_PROGRAM_PATH | - | |
| CMAKE_TLS_VERIFY | - | |
| CMAKE_TLS_VERSION | - | |
| NO_COLOR | - | |
| SSL_CERT_DIR | - | |
| SSL_CERT_FILE | - | |

### Environment Variables that Control the Build

| Command | Supported | Remarks |
| - | - | - |
| ADSP_ROOT | - | |
| CMAKE_APPLE_SILICON_PROCESSOR | - | |
| CMAKE_AUTOGEN_INTERMEDIATE_DIR_STRATEGY | - | |
| CMAKE_BUILD_PARALLEL_LEVEL | - | |
| CMAKE_BUILD_TYPE | - | |
| CMAKE_COLOR_DIAGNOSTICS | - | |
| CMAKE_CONFIG_DIR | - | |
| CMAKE_CONFIG_TYPE | - | |
| CMAKE_CONFIGURATION_TYPES | - | |
| CMAKE_CROSSCOMPILING_EMULATOR | - | |
| CMAKE_EXPORT_BUILD_DATABASE | - | |
| CMAKE_EXPORT_COMPILE_COMMANDS | - | |
| CMAKE_FASTBUILD_VERBOSE_GENERATOR | - | |
| CMAKE_GENERATOR | - | |
| CMAKE_GENERATOR_INSTANCE | - | |
| CMAKE_GENERATOR_PLATFORM | - | |
| CMAKE_GENERATOR_TOOLSET | - | |
| CMAKE_INSTALL_MODE | - | |
| CMAKE_INSTALL_PARALLEL_LEVEL | - | |
| CMAKE_INSTALL_PREFIX | - | |
| CMAKE_<LANG>_COMPILER_LAUNCHER | - | |
| CMAKE_<LANG>_IMPLICIT_LINK_DIRECTORIES_EXCLUDE | - | |
| CMAKE_<LANG>_IMPLICIT_LINK_LIBRARIES_EXCLUDE | - | |
| CMAKE_<LANG>_LINKER_LAUNCHER | - | |
| CMAKE_MSVCIDE_RUN_PATH | - | |
| CMAKE_INTERMEDIATE_DIR_STRATEGY | - | |
| CMAKE_NO_VERBOSE | - | |
| CMAKE_OSX_ARCHITECTURES | - | |
| CMAKE_TEST_LAUNCHER | - | |
| CMAKE_TOOLCHAIN_FILE | - | |
| DESTDIR | - | |
| LDFLAGS | - | |
| MACOSX_DEPLOYMENT_TARGET | - | |
| <PackageName>_ROOT | - | |
| VERBOSE | - | |

### Environment Variables for Languages

| Command | Supported | Remarks |
| - | - | - |
| ASM<DIALECT> | - | |
| ASM<DIALECT>FLAGS | - | |
| CC | - | |
| CFLAGS | - | |
| CSFLAGS | - | |
| CUDAARCHS | - | |
| CUDACXX | - | |
| CUDAFLAGS | - | |
| CUDAHOSTCXX | - | |
| CXX | - | |
| CXXFLAGS | - | |
| FC | - | |
| FFLAGS | - | |
| HIPCXX | - | |
| HIPFLAGS | - | |
| HIPHOSTCXX | - | |
| ISPC | - | |
| ISPCFLAGS | - | |
| OBJC | - | |
| OBJCFLAGS | - | |
| OBJCXX | - | |
| OBJCXXFLAGS | - | |
| RC | - | |
| RCFLAGS | - | |
| SWIFTC | - | |

### Environment Variables for CTest

| Command | Supported | Remarks |
| - | - | - |
| CMAKE_CONFIG_TYPE | - | |
| CTEST_INTERACTIVE_DEBUG_MODE | - | |
| CTEST_NO_TESTS_ACTION | - | |
| CTEST_OUTPUT_ON_FAILURE | - | |
| CTEST_PARALLEL_LEVEL | - | |
| CTEST_PROGRESS_OUTPUT | - | |
| CTEST_USE_INSTRUMENTATION | - | |
| CTEST_USE_LAUNCHERS_DEFAULT | - | |
| CTEST_USE_VERBOSE_INSTRUMENTATION | - | |
| DASHBOARD_TEST_FROM_CTEST | - | |

### Environment Variables for the CMake curses interface

| Command | Supported | Remarks |
| - | - | - |
| CCMAKE_COLORS | - | |

## Modules

https://cmake.org/cmake/help/latest/manual/cmake-modules.7.html

### Utility Modules

| Command | Supported | Remarks |
| - | - | - |
| AndroidTestUtilities | - | |
| BundleUtilities | - | |
| CheckCCompilerFlag | - | |
| CheckCompilerFlag | - | |
| CheckCSourceCompiles | - | |
| CheckCSourceRuns | - | |
| CheckCXXCompilerFlag | - | |
| CheckCXXSourceCompiles | - | |
| CheckCXXSourceRuns | - | |
| CheckCXXSymbolExists | - | |
| CheckFortranCompilerFlag | - | |
| CheckFortranFunctionExists | - | |
| CheckFortranSourceCompiles | - | |
| CheckFortranSourceRuns | - | |
| CheckFunctionExists | - | |
| CheckIncludeFile | - | |
| CheckIncludeFileCXX | - | |
| CheckIncludeFiles | - | |
| CheckIPOSupported | - | |
| CheckLanguage | - | |
| CheckLibraryExists | - | |
| CheckLinkerFlag | - | |
| CheckOBJCCompilerFlag | - | |
| CheckOBJCSourceCompiles | - | |
| CheckOBJCSourceRuns | - | |
| CheckOBJCXXCompilerFlag | - | |
| CheckOBJCXXSourceCompiles | - | |
| CheckOBJCXXSourceRuns | - | |
| CheckPIESupported | - | |
| CheckPrototypeDefinition | - | |
| CheckSourceCompiles | - | |
| CheckSourceRuns | - | |
| CheckStructHasMember | - | |
| CheckSymbolExists | - | |
| CheckTypeSize | - | |
| CheckVariableExists | - | |
| CMakeAddFortranSubdirectory | - | |
| CMakeBackwardCompatibilityCXX | - | |
| CMakeDependentOption | - | |
| CMakeFindDependencyMacro | - | |
| CMakePackageConfigHelpers | - | |
| CMakePrintHelpers | - | |
| CMakePrintSystemInformation | - | |
| CMakePushCheckState | - | |
| CMakeVerifyManifest | - | |
| CPack | - | |
| CPackComponent | - | |
| CPackIFW | - | |
| CPackIFWConfigureFile | - | |
| CSharpUtilities | - | |
| CTest | - | |
| CTestCoverageCollectGCOV | - | |
| CTestUseLaunchers | - | |
| DeployQt4 | - | |
| ExternalData | - | |
| ExternalProject | - | |
| FeatureSummary | - | |
| FetchContent | - | |
| FindPackageHandleStandardArgs | - | |
| FindPackageMessage | - | |
| FortranCInterface | - | |
| GenerateExportHeader | - | |
| GNUInstallDirs | - | |
| GoogleTest | - | |
| InstallRequiredSystemLibraries | - | |
| ProcessorCount | - | |
| SelectLibraryConfigurations | - | |
| TestForANSIForScope | - | |
| TestForANSIStreamHeaders | - | |
| TestForSSTREAM | - | |
| TestForSTDNamespace | - | |
| UseEcos | - | |
| UseJava | - | |
| UseSWIG | - | |
| UsewxWidgets | - | |

### Find Modules

| Command | Supported | Remarks |
| - | - | - |
| FindALSA | - | |
| FindArmadillo | - | |
| FindASPELL | - | |
| FindAVIFile | - | |
| FindBacktrace | - | |
| FindBISON | - | |
| FindBLAS | - | |
| FindBullet | - | |
| FindBZip2 | - | |
| FindCoin3D | - | |
| FindCUDAToolkit | - | |
| FindCups | - | |
| FindCURL | - | |
| FindCurses | - | |
| FindCVS | - | |
| FindCxxTest | - | |
| FindCygwin | - | |
| FindDCMTK | - | |
| FindDevIL | - | |
| FindDoxygen | - | |
| FindEnvModules | - | |
| FindEXPAT | - | |
| FindFLEX | - | |
| FindFLTK | - | |
| FindFLTK2 | - | |
| FindFontconfig | - | |
| FindFreetype | - | |
| FindGettext | - | |
| FindGIF | - | |
| FindGit | - | |
| FindGLEW | - | |
| FindGLUT | - | |
| FindGnuplot | - | |
| FindGnuTLS | - | |
| FindGSL | - | |
| FindGTest | - | |
| FindGTK | - | |
| FindGTK2 | - | |
| FindHDF5 | - | |
| FindHg | - | |
| FindHSPELL | - | |
| FindHTMLHelp | - | |
| FindIce | - | |
| FindIconv | - | |
| FindIcotool | - | |
| FindICU | - | |
| FindImageMagick | - | |
| FindIntl | - | |
| FindJasper | - | |
| FindJava | - | |
| FindJNI | - | |
| FindJPEG | - | |
| FindKDE3 | - | |
| FindKDE4 | - | |
| FindLAPACK | - | |
| FindLATEX | - | |
| FindLibArchive | - | |
| FindLibinput | - | |
| FindLibLZMA | - | |
| FindLibXml2 | - | |
| FindLibXslt | - | |
| FindLTTngUST | - | |
| FindLua | - | |
| FindLua50 | - | |
| FindLua51 | - | |
| FindMatlab | - | |
| FindMFC | - | |
| FindMotif | - | |
| FindMPEG | - | |
| FindMPEG2 | - | |
| FindMPI | - | |
| FindMsys | - | |
| FindODBC | - | |
| FindOpenACC | - | |
| FindOpenAL | - | |
| FindOpenCL | - | |
| FindOpenGL | - | |
| FindOpenMP | - | |
| FindOpenSceneGraph | - | |
| FindOpenSP | - | |
| FindOpenSSL | - | |
| FindOpenThreads | - | |
| Findosg | - | |
| FindosgAnimation | - | |
| FindosgDB | - | |
| FindosgFX | - | |
| FindosgGA | - | |
| FindosgIntrospection | - | |
| FindosgManipulator | - | |
| FindosgParticle | - | |
| FindosgPresentation | - | |
| FindosgProducer | - | |
| FindosgQt | - | |
| FindosgShadow | - | |
| FindosgSim | - | |
| FindosgTerrain | - | |
| FindosgText | - | |
| FindosgUtil | - | |
| FindosgViewer | - | |
| FindosgVolume | - | |
| FindosgWidget | - | |
| FindPatch | - | |
| FindPerl | - | |
| FindPerlLibs | - | |
| FindPHP4 | - | |
| FindPhysFS | - | |
| FindPike | - | |
| FindPkgConfig | - | |
| FindPNG | - | |
| FindPostgreSQL | - | |
| FindProducer | - | |
| FindProtobuf | - | |
| FindPython | - | |
| FindPython2 | - | |
| FindPython3 | - | |
| FindQt3 | - | |
| FindQt4 | - | |
| FindQuickTime | - | |
| FindRTI | - | |
| FindRuby | - | |
| FindSDL | - | |
| FindSDL_gfx | - | |
| FindSDL_image | - | |
| FindSDL_mixer | - | |
| FindSDL_net | - | |
| FindSDL_sound | - | |
| FindSDL_ttf | - | |
| FindSelfPackers | - | |
| FindSQLite3 | - | |
| FindSquish | - | |
| FindSubversion | - | |
| FindSWIG | - | |
| FindTCL | - | |
| FindTclsh | - | |
| FindTclStub | - | |
| FindThreads | - | |
| FindTIFF | - | |
| FindVulkan | - | |
| FindWget | - | |
| FindWish | - | |
| FindwxWidgets | - | |
| FindX11 | - | |
| FindXalanC | - | |
| FindXCTest | - | |
| FindXercesC | - | |
| FindXMLRPC | - | |
| FindZLIB | - | |

### Deprecated Utility Modules

| Command | Supported | Remarks |
| - | - | - |
| AddFileDependencies | - | |
| CMakeDetermineVSServicePack | - | |
| CMakeExpandImportedTargets | - | |
| CMakeFindFrameworks | - | |
| CMakeForceCompiler | - | |
| CMakeParseArguments | - | |
| Dart | - | |
| Documentation | - | |
| GetPrerequisites | - | |
| MacroAddFileDependencies | - | |
| TestBigEndian | - | |
| TestCXXAcceptsFlag | - | |
| Use_wxWindows | - | |
| UseJavaClassFilelist | - | |
| UseJavaSymlinks | - | |
| UsePkgConfig | - | |
| WriteBasicConfigVersionFile | - | |
| WriteCompilerDetectionHeader | - | |

### Deprecated Find Modules

| Command | Supported | Remarks |
| - | - | - |
| FindBoost | - | |
| FindCABLE | - | |
| FindCUDA | - | |
| FindDart | - | |
| FindGCCXML | - | |
| FindGDAL | - | |
| FindITK | - | |
| FindPythonInterp | - | |
| FindPythonLibs | - | |
| FindQt | - | |
| FindUnixCommands | - | |
| FindVTK | - | |
| FindwxWindows | - | |

### Legacy CPack Modules

| Command | Supported | Remarks |
| - | - | - |
| CPackArchive | - | |
| CPackBundle | - | |
| CPackCygwin | - | |
| CPackDeb | - | |
| CPackDMG | - | |
| CPackFreeBSD | - | |
| CPackNSIS | - | |
| CPackNuGet | - | |
| CPackProductBuild | - | |
| CPackRPM | - | |
| CPackWIX | - | |

### Miscellaneous Modules

| Command | Supported | Remarks |
| - | - | - |
| CMakeFindPackageMode | - | |
| CMakeGraphVizOptions | - | |
| CTestScriptMode | - | |
| Findosg_functions | - | |
| SquishTestScript | - | |

## Supported Policies

https://cmake.org/cmake/help/latest/manual/cmake-policies.7.html

### Policies Introduced by CMake 4.2

| Command | Supported | Remarks |
| - | - | - |
| CMP0204 | - | |
| CMP0203 | - | |
| CMP0202 | - | |
| CMP0201 | - | |
| CMP0200 | - | |
| CMP0199 | - | |
| CMP0198 | - | |

### Policies Introduced by CMake 4.1

| Command | Supported | Remarks |
| - | - | - |
| CMP0197 | - | |
| CMP0196 | - | |
| CMP0195 | - | |
| CMP0194 | - | |
| CMP0193 | - | |
| CMP0192 | - | |
| CMP0191 | - | |
| CMP0190 | - | |
| CMP0189 | - | |
| CMP0188 | - | |
| CMP0187 | - | |
| CMP0186 | - | |

### Policies Introduced by CMake 4.0

| Command | Supported | Remarks |
| - | - | - |
| CMP0185 | - | |
| CMP0184 | - | |
| CMP0183 | - | |
| CMP0182 | - | |
| CMP0181 | - | |

### Policies Introduced by CMake 3.31

| Command | Supported | Remarks |
| - | - | - |
| CMP0180 | - | Not important. |
| CMP0179 | - | |
| CMP0178 | - | |
| CMP0177 | - | |
| CMP0176 | - | |
| CMP0175 | - | |
| CMP0174 | - | |
| CMP0173 | - | |
| CMP0172 | - | |
| CMP0171 | - | |

### Policies Introduced by CMake 3.30

| Command | Supported | Remarks |
| - | - | - |
| CMP0170 | - | |
| CMP0169 | - | |
| CMP0168 | - | |
| CMP0167 | - | |
| CMP0166 | - | |
| CMP0165 | - | |
| CMP0164 | - | |
| CMP0163 | - | |
| CMP0162 | - | |

### Policies Introduced by CMake 3.29

| Command | Supported | Remarks |
| - | - | - |
| CMP0161 | - | |
| CMP0160 | - | |
| CMP0159 | - | |
| CMP0158 | - | |
| CMP0157 | - | |
| CMP0156 | - | |

### Policies Introduced by CMake 3.28

| Command | Supported | Remarks |
| - | - | - |
| CMP0155 | - | |
| CMP0154 | - | |
| CMP0153 | - | |
| CMP0152 | - | |

### Policies Introduced by CMake 3.27

| Command | Supported | Remarks |
| - | - | - |
| CMP0151 | - | |
| CMP0150 | - | |
| CMP0149 | - | |
| CMP0148 | - | |
| CMP0147 | - | |
| CMP0146 | - | |
| CMP0145 | - | |
| CMP0144 | - | |

### Policies Introduced by CMake 3.26

| Command | Supported | Remarks |
| - | - | - |
| CMP0143 | - | |

### Policies Introduced by CMake 3.25

| Command | Supported | Remarks |
| - | - | - |
| CMP0142 | - | |
| CMP0141 | - | |
| CMP0140 | - | |

### Policies Introduced by CMake 3.24

| Command | Supported | Remarks |
| - | - | - |
| CMP0139 | - | |
| CMP0138 | - | |
| CMP0137 | - | |
| CMP0136 | - | |
| CMP0135 | - | |
| CMP0134 | - | |
| CMP0133 | - | |
| CMP0132 | - | |
| CMP0131 | - | |
| CMP0130 | - | |

### Policies Introduced by CMake 3.23

| Command | Supported | Remarks |
| - | - | - |
| CMP0129 | - | |

### Policies Introduced by CMake 3.22

| Command | Supported | Remarks |
| - | - | - |
| CMP0128 | - | |
| CMP0127 | - | |

### Policies Introduced by CMake 3.21

| Command | Supported | Remarks |
| - | - | - |
| CMP0126 | - | |
| CMP0125 | - | |
| CMP0124 | - | |
| CMP0123 | - | |
| CMP0122 | - | |
| CMP0121 | - | |

### Policies Introduced by CMake 3.20

| Command | Supported | Remarks |
| - | - | - |
| CMP0120 | - | |
| CMP0119 | - | |
| CMP0118 | - | |
| CMP0117 | - | |
| CMP0116 | - | |
| CMP0115 | - | |

### Policies Introduced by CMake 3.19

| Command | Supported | Remarks |
| - | - | - |
| CMP0114 | - | |
| CMP0113 | - | |
| CMP0112 | - | |
| CMP0111 | - | |
| CMP0110 | - | |
| CMP0109 | - | |

### Policies Introduced by CMake 3.18

| Command | Supported | Remarks |
| - | - | - |
| CMP0108 | - | |
| CMP0107 | - | |
| CMP0106 | - | |
| CMP0105 | - | |
| CMP0104 | - | |
| CMP0103 | - | |

### Policies Introduced by CMake 3.17

| Command | Supported | Remarks |
| - | - | - |
| CMP0102 | - | |
| CMP0101 | - | |
| CMP0100 | - | |
| CMP0099 | - | |
| CMP0098 | - | |

### Policies Introduced by CMake 3.16

| Command | Supported | Remarks |
| - | - | - |
| CMP0097 | - | |
| CMP0096 | - | |
| CMP0095 | - | |

### Policies Introduced by CMake 3.15

| Command | Supported | Remarks |
| - | - | - |
| CMP0094 | - | |
| CMP0093 | - | |
| CMP0092 | - | |
| CMP0091 | - | |
| CMP0090 | - | |
| CMP0089 | - | |

### Policies Introduced by CMake 3.14

| Command | Supported | Remarks |
| - | - | - |
| CMP0088 | - | |
| CMP0087 | - | |
| CMP0086 | - | |
| CMP0085 | - | |
| CMP0084 | - | |
| CMP0083 | - | |
| CMP0082 | - | |

### Policies Introduced by CMake 3.13

| Command | Supported | Remarks |
| - | - | - |
| CMP0081 | - | |
| CMP0080 | - | |
| CMP0079 | - | |
| CMP0078 | - | |
| CMP0077 | - | |
| CMP0076 | - | |

### Policies Introduced by CMake 3.12

| Command | Supported | Remarks |
| - | - | - |
| CMP0075 | - | |
| CMP0074 | - | |
| CMP0073 | - | |

### Policies Introduced by CMake 3.11

| Command | Supported | Remarks |
| - | - | - |
| CMP0072 | - | |

### Policies Introduced by CMake 3.10

| Command | Supported | Remarks |
| - | - | - |
| CMP0071 | - | |
| CMP0070 | - | |

### Policies Introduced by CMake 3.9

| Command | Supported | Remarks |
| - | - | - |
| CMP0069 | - | |
| CMP0068 | - | |

### Policies Introduced by CMake 3.8

| Command | Supported | Remarks |
| - | - | - |
| CMP0067 | - | |

### Policies Introduced by CMake 3.7

| Command | Supported | Remarks |
| - | - | - |
| CMP0066 | - | |

### Policies Introduced by CMake 3.4, Removed by CMake 4.0

| Command | Supported | Remarks |
| - | - | - |
| CMP0065 | - | |
| CMP0064 | - | |

### Policies Introduced by CMake 3.3, Removed by CMake 4.0

| Command | Supported | Remarks |
| - | - | - |
| CMP0063 | - | |
| CMP0062 | - | |
| CMP0061 | - | |
| CMP0060 | - | |
| CMP0059 | - | |
| CMP0058 | - | |
| CMP0057 | - | |

### Policies Introduced by CMake 3.2, Removed by CMake 4.0

| Command | Supported | Remarks |
| - | - | - |
| CMP0056 | - | |
| CMP0055 | - | |

### Policies Introduced by CMake 3.1, Removed by CMake 4.0

| Command | Supported | Remarks |
| - | - | - |
| CMP0054 | - | |
| CMP0053 | - | |
| CMP0052 | - | |
| CMP0051 | - | |

### Policies Introduced by CMake 3.0, Removed by CMake 4.0

| Command | Supported | Remarks |
| - | - | - |
| CMP0050 | - | |
| CMP0049 | - | |
| CMP0048 | 4.2 | New if `project([VERSION])` is set. |
| CMP0047 | - | |
| CMP0046 | - | |
| CMP0045 | - | |
| CMP0044 | - | |
| CMP0043 | - | |
| CMP0042 | - | |
| CMP0041 | - | |
| CMP0040 | - | |
| CMP0039 | - | |
| CMP0038 | - | |
| CMP0037 | - | |
| CMP0036 | - | |
| CMP0035 | - | |
| CMP0034 | - | |
| CMP0033 | - | |
| CMP0032 | - | |
| CMP0031 | - | |
| CMP0030 | - | |
| CMP0029 | - | |
| CMP0028 | - | |
| CMP0027 | - | |
| CMP0026 | - | |
| CMP0025 | - | |
| CMP0024 | - | |

### Policies Introduced by CMake 2.8, Removed by CMake 4.0

| Command | Supported | Remarks |
| - | - | - |
| CMP0023 | - | |
| CMP0022 | - | |
| CMP0021 | - | |
| CMP0020 | - | |
| CMP0019 | - | |
| CMP0018 | - | |
| CMP0017 | - | |
| CMP0016 | - | |
| CMP0015 | - | |
| CMP0014 | - | |
| CMP0013 | - | |
| CMP0012 | - | |

### Policies Introduced by CMake 2.6, Removed by CMake 4.0

| Command | Supported | Remarks |
| - | - | - |
| CMP0011 | - | |
| CMP0010 | - | |
| CMP0009 | - | |
| CMP0008 | - | |
| CMP0007 | - | |
| CMP0006 | - | |
| CMP0005 | - | |
| CMP0004 | - | |
| CMP0003 | - | |
| CMP0002 | - | |
| CMP0001 | - | |
| CMP0000 | - | |

## Properties

https://cmake.org/cmake/help/latest/manual/cmake-properties.7.html

### Global Scope

| Command | Supported | Remarks |
| - | - | - |
| ALLOW_DUPLICATE_CUSTOM_TARGETS | - | |
| AUTOGEN_SOURCE_GROUP | - | |
| AUTOGEN_TARGETS_FOLDER | - | |
| AUTOMOC_SOURCE_GROUP | - | |
| AUTOMOC_TARGETS_FOLDER | - | |
| AUTORCC_SOURCE_GROUP | - | |
| AUTOUIC_SOURCE_GROUP | - | |
| CMAKE_C_KNOWN_FEATURES | - | |
| CMAKE_CUDA_KNOWN_FEATURES | - | |
| CMAKE_CXX_KNOWN_FEATURES | - | |
| CMAKE_HIP_KNOWN_FEATURES | - | |
| CMAKE_ROLE | - | |
| DEBUG_CONFIGURATIONS | - | |
| DISABLED_FEATURES | - | |
| ECLIPSE_EXTRA_CPROJECT_CONTENTS | - | |
| ECLIPSE_EXTRA_NATURES | - | |
| ENABLED_FEATURES | - | |
| ENABLED_LANGUAGES | - | |
| FIND_LIBRARY_USE_LIB32_PATHS | - | |
| FIND_LIBRARY_USE_LIB64_PATHS | - | |
| FIND_LIBRARY_USE_LIBX32_PATHS | - | |
| FIND_LIBRARY_USE_OPENBSD_VERSIONING | - | |
| GENERATOR_IS_MULTI_CONFIG | - | |
| GLOBAL_DEPENDS_DEBUG_MODE | - | |
| GLOBAL_DEPENDS_NO_CYCLES | - | |
| INSTALL_PARALLEL | - | |
| IN_TRY_COMPILE | - | |
| JOB_POOLS | - | |
| PACKAGES_FOUND | - | |
| PACKAGES_NOT_FOUND | - | |
| PREDEFINED_TARGETS_FOLDER | - | |
| PROPAGATE_TOP_LEVEL_INCLUDES_TO_TRY_COMPILE | - | |
| REPORT_UNDEFINED_PROPERTIES | - | |
| RULE_LAUNCH_COMPILE | - | |
| RULE_LAUNCH_CUSTOM | - | |
| RULE_LAUNCH_LINK | - | |
| RULE_MESSAGES | - | |
| TARGET_ARCHIVES_MAY_BE_SHARED_LIBS | - | |
| TARGET_MESSAGES | - | |
| TARGET_SUPPORTS_SHARED_LIBS | - | |
| USE_FOLDERS | - | |
| XCODE_EMIT_EFFECTIVE_PLATFORM_NAME | - | |

Properties on Directories

| Command | Supported | Remarks |
| - | - | - |
| ADDITIONAL_CLEAN_FILES | - | |
| BINARY_DIR | - | |
| BUILDSYSTEM_TARGETS | - | |
| CACHE_VARIABLES | - | |
| CLEAN_NO_CUSTOM | - | |
| CMAKE_CONFIGURE_DEPENDS | - | |
| COMPILE_DEFINITIONS | - | |
| COMPILE_OPTIONS | - | |
| DEFINITIONS | - | |
| EXCLUDE_FROM_ALL | - | |
| IMPLICIT_DEPENDS_INCLUDE_TRANSFORM | - | |
| IMPORTED_TARGETS | - | |
| INCLUDE_DIRECTORIES | - | |
| INCLUDE_REGULAR_EXPRESSION | - | |
| LABELS | - | |
| LINK_DIRECTORIES | - | |
| LINK_OPTIONS | - | |
| LISTFILE_STACK | - | |
| MACROS | - | |
| PARENT_DIRECTORY | - | |
| RULE_LAUNCH_COMPILE | - | |
| RULE_LAUNCH_CUSTOM | - | |
| RULE_LAUNCH_LINK | - | |
| SOURCE_DIR | - | |
| SUBDIRECTORIES | - | |
| SYSTEM | - | |
| TESTS | - | |
| TEST_INCLUDE_FILES | - | |
| VARIABLES | - | |
| VS_GLOBAL_SECTION_POST_<section> | - | |
| VS_GLOBAL_SECTION_PRE_<section> | - | |
| VS_SOLUTION_ITEMS | - | |
| VS_STARTUP_PROJECT | - | |

### Targets

| Command | Supported | Remarks |
| - | - | - |
| ADDITIONAL_CLEAN_FILES | - | |
| AIX_EXPORT_ALL_SYMBOLS | - | |
| AIX_SHARED_LIBRARY_ARCHIVE | - | |
| ALIAS_GLOBAL | - | |
| ALIASED_TARGET | - | |
| ANDROID_ANT_ADDITIONAL_OPTIONS | - | |
| ANDROID_API | - | |
| ANDROID_API_MIN | - | |
| ANDROID_ARCH | - | |
| ANDROID_ASSETS_DIRECTORIES | - | |
| ANDROID_GUI | - | |
| ANDROID_JAR_DEPENDENCIES | - | |
| ANDROID_JAR_DIRECTORIES | - | |
| ANDROID_JAVA_SOURCE_DIR | - | |
| ANDROID_NATIVE_LIB_DEPENDENCIES | - | |
| ANDROID_NATIVE_LIB_DIRECTORIES | - | |
| ANDROID_PROCESS_MAX | - | |
| ANDROID_PROGUARD | - | |
| ANDROID_PROGUARD_CONFIG_PATH | - | |
| ANDROID_SECURE_PROPS_PATH | - | |
| ANDROID_SKIP_ANT_STEP | - | |
| ANDROID_STL_TYPE | - | |
| ARCHIVE_OUTPUT_DIRECTORY | - | |
| ARCHIVE_OUTPUT_DIRECTORY_<CONFIG> | - | |
| ARCHIVE_OUTPUT_NAME | - | |
| ARCHIVE_OUTPUT_NAME_<CONFIG> | - | |
| AUTOGEN_BETTER_GRAPH_MULTI_CONFIG | - | |
| AUTOGEN_BUILD_DIR | - | |
| AUTOGEN_COMMAND_LINE_LENGTH_MAX | - | |
| AUTOGEN_ORIGIN_DEPENDS | - | |
| AUTOGEN_PARALLEL | - | |
| AUTOGEN_TARGET_DEPENDS | - | |
| AUTOGEN_USE_SYSTEM_INCLUDE | - | |
| AUTOMOC | - | |
| AUTOMOC_COMPILER_PREDEFINES | - | |
| AUTOMOC_DEPEND_FILTERS | - | |
| AUTOMOC_EXECUTABLE | - | |
| AUTOMOC_INCLUDE_DIRECTORIES | - | |
| AUTOMOC_MACRO_NAMES | - | |
| AUTOMOC_MOC_OPTIONS | - | |
| AUTOMOC_PATH_PREFIX | - | |
| AUTORCC | - | |
| AUTORCC_EXECUTABLE | - | |
| AUTORCC_OPTIONS | - | |
| AUTOUIC | - | |
| AUTOUIC_EXECUTABLE | - | |
| AUTOUIC_OPTIONS | - | |
| AUTOUIC_SEARCH_PATHS | - | |
| BINARY_DIR | - | |
| BUILD_RPATH | - | |
| BUILD_RPATH_USE_ORIGIN | - | |
| BUILD_WITH_INSTALL_NAME_DIR | - | |
| BUILD_WITH_INSTALL_RPATH | - | |
| BUNDLE | - | |
| BUNDLE_EXTENSION | - | |
| C_EXTENSIONS | - | |
| C_STANDARD | - | |
| C_STANDARD_REQUIRED | - | |
| COMMON_LANGUAGE_RUNTIME | - | |
| COMPATIBLE_INTERFACE_BOOL | - | |
| COMPATIBLE_INTERFACE_NUMBER_MAX | - | |
| COMPATIBLE_INTERFACE_NUMBER_MIN | - | |
| COMPATIBLE_INTERFACE_STRING | - | |
| COMPILE_DEFINITIONS | - | |
| COMPILE_FEATURES | - | |
| COMPILE_FLAGS | - | |
| COMPILE_OPTIONS | - | |
| COMPILE_PDB_NAME | - | |
| COMPILE_PDB_NAME_<CONFIG> | - | |
| COMPILE_PDB_OUTPUT_DIRECTORY | - | |
| COMPILE_PDB_OUTPUT_DIRECTORY_<CONFIG> | - | |
| COMPILE_WARNING_AS_ERROR | - | |
| <CONFIG>_OUTPUT_NAME | - | |
| <CONFIG>_POSTFIX | - | |
| CROSSCOMPILING_EMULATOR | - | |
| CUDA_ARCHITECTURES | - | |
| CUDA_CUBIN_COMPILATION | - | |
| CUDA_EXTENSIONS | - | |
| CUDA_FATBIN_COMPILATION | - | |
| CUDA_OPTIX_COMPILATION | - | |
| CUDA_PTX_COMPILATION | - | |
| CUDA_RESOLVE_DEVICE_SYMBOLS | - | |
| CUDA_RUNTIME_LIBRARY | - | |
| CUDA_SEPARABLE_COMPILATION | - | |
| CUDA_STANDARD | - | |
| CUDA_STANDARD_REQUIRED | - | |
| CXX_EXTENSIONS | - | |
| CXX_MODULE_DIRS | - | |
| CXX_MODULE_DIRS_<NAME> | - | |
| CXX_MODULE_SET | - | |
| CXX_MODULE_SET_<NAME> | - | |
| CXX_MODULE_SETS | - | |
| CXX_MODULE_STD | - | |
| CXX_SCAN_FOR_MODULES | - | |
| CXX_STANDARD | - | |
| CXX_STANDARD_REQUIRED | - | |
| DEBUG_POSTFIX | - | |
| DEBUGGER_WORKING_DIRECTORY | - | |
| DEFINE_SYMBOL | - | |
| DEPLOYMENT_ADDITIONAL_FILES | - | |
| DEPLOYMENT_REMOTE_DIRECTORY | - | |
| DEPRECATION | - | |
| DISABLE_PRECOMPILE_HEADERS | - | |
| DLL_NAME_WITH_SOVERSION | - | |
| DOTNET_SDK | - | |
| DOTNET_TARGET_FRAMEWORK | - | |
| DOTNET_TARGET_FRAMEWORK_VERSION | - | |
| EchoString | - | |
| ENABLE_EXPORTS | - | |
| EXCLUDE_FROM_ALL | - | |
| EXCLUDE_FROM_DEFAULT_BUILD | - | |
| EXCLUDE_FROM_DEFAULT_BUILD_<CONFIG> | - | |
| EXPORT_BUILD_DATABASE | - | |
| EXPORT_COMPILE_COMMANDS | - | |
| EXPORT_FIND_PACKAGE_NAME | - | |
| EXPORT_NAME | - | |
| EXPORT_NO_SYSTEM | - | |
| EXPORT_PROPERTIES | - | |
| FASTBUILD_CACHING | - | |
| FASTBUILD_DISTRIBUTION | - | |
| FOLDER | - | |
| Fortran_BUILDING_INTRINSIC_MODULES | - | |
| Fortran_FORMAT | - | |
| Fortran_MODULE_DIRECTORY | - | |
| Fortran_PREPROCESS | - | |
| FRAMEWORK | - | |
| FRAMEWORK_MULTI_CONFIG_POSTFIX_<CONFIG> | - | |
| FRAMEWORK_VERSION | - | |
| GENERATOR_FILE_NAME | - | |
| GHS_INTEGRITY_APP | - | |
| GHS_NO_SOURCE_GROUP_FILE | - | |
| GNUtoMS | - | |
| HAS_CXX | - | |
| HEADER_DIRS | - | |
| HEADER_DIRS_<NAME> | - | |
| HEADER_SET | - | |
| HEADER_SET_<NAME> | - | |
| HEADER_SETS | - | |
| HIP_ARCHITECTURES | - | |
| HIP_EXTENSIONS | - | |
| HIP_STANDARD | - | |
| HIP_STANDARD_REQUIRED | - | |
| IMPLICIT_DEPENDS_INCLUDE_TRANSFORM | - | |
| IMPORTED | - | |
| IMPORTED_COMMON_LANGUAGE_RUNTIME | - | |
| IMPORTED_CONFIGURATIONS | - | |
| IMPORTED_CXX_MODULES_COMPILE_DEFINITIONS | - | |
| IMPORTED_CXX_MODULES_COMPILE_FEATURES | - | |
| IMPORTED_CXX_MODULES_COMPILE_OPTIONS | - | |
| IMPORTED_CXX_MODULES_INCLUDE_DIRECTORIES | - | |
| IMPORTED_CXX_MODULES_LINK_LIBRARIES | - | |
| IMPORTED_GLOBAL | - | |
| IMPORTED_IMPLIB | - | |
| IMPORTED_IMPLIB_<CONFIG> | - | |
| IMPORTED_LIBNAME | - | |
| IMPORTED_LIBNAME_<CONFIG> | - | |
| IMPORTED_LINK_DEPENDENT_LIBRARIES | - | |
| IMPORTED_LINK_DEPENDENT_LIBRARIES_<CONFIG> | - | |
| IMPORTED_LINK_INTERFACE_LANGUAGES | - | |
| IMPORTED_LINK_INTERFACE_LANGUAGES_<CONFIG> | - | |
| IMPORTED_LINK_INTERFACE_LIBRARIES | - | |
| IMPORTED_LINK_INTERFACE_LIBRARIES_<CONFIG> | - | |
| IMPORTED_LINK_INTERFACE_MULTIPLICITY | - | |
| IMPORTED_LINK_INTERFACE_MULTIPLICITY_<CONFIG> | - | |
| IMPORTED_LOCATION | - | |
| IMPORTED_LOCATION_<CONFIG> | - | |
| IMPORTED_NO_SONAME | - | |
| IMPORTED_NO_SONAME_<CONFIG> | - | |
| IMPORTED_OBJECTS | - | |
| IMPORTED_OBJECTS_<CONFIG> | - | |
| IMPORTED_SONAME | - | |
| IMPORTED_SONAME_<CONFIG> | - | |
| IMPORT_PREFIX | - | |
| IMPORT_SUFFIX | - | |
| INCLUDE_DIRECTORIES | - | |
| INSTALL_NAME_DIR | - | |
| INSTALL_OBJECT_NAME_STRATEGY | - | |
| INSTALL_OBJECT_ONLY_USE_DESTINATION | - | |
| INSTALL_REMOVE_ENVIRONMENT_RPATH | - | |
| INSTALL_RPATH | - | |
| INSTALL_RPATH_USE_LINK_PATH | - | |
| INTERFACE_AUTOMOC_MACRO_NAMES | - | |
| INTERFACE_AUTOUIC_OPTIONS | - | |
| INTERFACE_COMPILE_DEFINITIONS | - | |
| INTERFACE_COMPILE_FEATURES | - | |
| INTERFACE_COMPILE_OPTIONS | - | |
| INTERFACE_CXX_MODULE_SETS | - | |
| INTERFACE_HEADER_SETS | - | |
| INTERFACE_HEADER_SETS_TO_VERIFY | - | |
| INTERFACE_INCLUDE_DIRECTORIES | - | |
| INTERFACE_LINK_DEPENDS | - | |
| INTERFACE_LINK_DIRECTORIES | - | |
| INTERFACE_LINK_LIBRARIES | - | |
| INTERFACE_LINK_LIBRARIES_DIRECT | - | |
| INTERFACE_LINK_LIBRARIES_DIRECT_EXCLUDE | - | |
| INTERFACE_LINK_OPTIONS | - | |
| INTERFACE_POSITION_INDEPENDENT_CODE | - | |
| INTERFACE_PRECOMPILE_HEADERS | - | |
| INTERFACE_SOURCES | - | |
| INTERFACE_SYSTEM_INCLUDE_DIRECTORIES | - | |
| INTERPROCEDURAL_OPTIMIZATION | - | |
| INTERPROCEDURAL_OPTIMIZATION_<CONFIG> | - | |
| ISPC_HEADER_DIRECTORY | - | |
| ISPC_HEADER_SUFFIX | - | |
| ISPC_INSTRUCTION_SETS | - | |
| JOB_POOL_COMPILE | - | |
| JOB_POOL_LINK | - | |
| JOB_POOL_PRECOMPILE_HEADER | - | |
| LABELS | - | |
| <LANG>_CLANG_TIDY | - | |
| <LANG>_CLANG_TIDY_EXPORT_FIXES_DIR | - | |
| <LANG>_COMPILER_LAUNCHER | - | |
| <LANG>_CPPCHECK | - | |
| <LANG>_CPPLINT | - | |
| <LANG>_EXTENSIONS | - | |
| <LANG>_ICSTAT | - | |
| <LANG>_INCLUDE_WHAT_YOU_USE | - | |
| <LANG>_LINKER_LAUNCHER | - | |
| <LANG>_STANDARD | - | |
| <LANG>_STANDARD_REQUIRED | - | |
| <LANG>_VISIBILITY_PRESET | - | |
| LIBRARY_OUTPUT_DIRECTORY | - | |
| LIBRARY_OUTPUT_DIRECTORY_<CONFIG> | - | |
| LIBRARY_OUTPUT_NAME | - | |
| LIBRARY_OUTPUT_NAME_<CONFIG> | - | |
| SPDX_LICENSE | - | |
| LINK_DEPENDS | - | |
| LINK_DEPENDS_NO_SHARED | - | |
| LINK_DIRECTORIES | - | |
| LINK_FLAGS | - | |
| LINK_FLAGS_<CONFIG> | - | |
| LINK_INTERFACE_LIBRARIES | - | |
| LINK_INTERFACE_LIBRARIES_<CONFIG> | - | |
| LINK_INTERFACE_MULTIPLICITY | - | |
| LINK_INTERFACE_MULTIPLICITY_<CONFIG> | - | |
| LINK_LIBRARIES | - | |
| LINK_LIBRARIES_ONLY_TARGETS | - | |
| LINK_LIBRARIES_STRATEGY | - | |
| LINK_LIBRARY_OVERRIDE | - | |
| LINK_LIBRARY_OVERRIDE_<LIBRARY> | - | |
| LINK_OPTIONS | - | |
| LINK_SEARCH_END_STATIC | - | |
| LINK_SEARCH_START_STATIC | - | |
| LINK_WARNING_AS_ERROR | - | |
| LINK_WHAT_YOU_USE | - | |
| LINKER_LANGUAGE | - | |
| LINKER_TYPE | - | |
| LOCATION | - | |
| LOCATION_<CONFIG> | - | |
| MACHO_COMPATIBILITY_VERSION | - | |
| MACHO_CURRENT_VERSION | - | |
| MACOSX_BUNDLE | - | |
| MACOSX_BUNDLE_INFO_PLIST | - | |
| MACOSX_FRAMEWORK_INFO_PLIST | - | |
| MACOSX_RPATH | - | |
| MANUALLY_ADDED_DEPENDENCIES | - | |
| MAP_IMPORTED_CONFIG_<CONFIG> | - | |
| MSVC_DEBUG_INFORMATION_FORMAT | - | |
| MSVC_RUNTIME_CHECKS | - | |
| MSVC_RUNTIME_LIBRARY | - | |
| NAME | - | |
| NO_SONAME | - | |
| NO_SYSTEM_FROM_IMPORTED | - | |
| OBJC_EXTENSIONS | - | |
| OBJC_STANDARD | - | |
| OBJC_STANDARD_REQUIRED | - | |
| OBJCXX_EXTENSIONS | - | |
| OBJCXX_STANDARD | - | |
| OBJCXX_STANDARD_REQUIRED | - | |
| OPTIMIZE_DEPENDENCIES | - | |
| OSX_ARCHITECTURES | - | |
| OSX_ARCHITECTURES_<CONFIG> | - | |
| OUTPUT_NAME | - | |
| OUTPUT_NAME_<CONFIG> | - | |
| PCH_INSTANTIATE_TEMPLATES | - | |
| PCH_WARN_INVALID | - | |
| PDB_NAME | - | |
| PDB_NAME_<CONFIG> | - | |
| PDB_OUTPUT_DIRECTORY | - | |
| PDB_OUTPUT_DIRECTORY_<CONFIG> | - | |
| POSITION_INDEPENDENT_CODE | - | |
| PRECOMPILE_HEADERS | - | |
| PRECOMPILE_HEADERS_REUSE_FROM | - | |
| PREFIX | - | |
| PRIVATE_HEADER | - | |
| PROJECT_LABEL | - | |
| PUBLIC_HEADER | - | |
| RESOURCE | - | |
| RULE_LAUNCH_COMPILE | - | |
| RULE_LAUNCH_CUSTOM | - | |
| RULE_LAUNCH_LINK | - | |
| RUNTIME_OUTPUT_DIRECTORY | - | |
| RUNTIME_OUTPUT_DIRECTORY_<CONFIG> | - | |
| RUNTIME_OUTPUT_NAME | - | |
| RUNTIME_OUTPUT_NAME_<CONFIG> | - | |
| SKIP_BUILD_RPATH | - | |
| SKIP_LINTING | - | |
| SOURCE_DIR | - | |
| SOURCES | - | |
| SOVERSION | - | |
| STATIC_LIBRARY_FLAGS | - | |
| STATIC_LIBRARY_FLAGS_<CONFIG> | - | |
| STATIC_LIBRARY_OPTIONS | - | |
| SUFFIX | - | |
| Swift_COMPILATION_MODE | - | |
| Swift_DEPENDENCIES_FILE | - | |
| Swift_LANGUAGE_VERSION | - | |
| Swift_MODULE_DIRECTORY | - | |
| Swift_MODULE_NAME | - | |
| SYMBOLIC | - | |
| SYSTEM | - | |
| TEST_LAUNCHER | - | |
| TRANSITIVE_COMPILE_PROPERTIES | - | |
| TRANSITIVE_LINK_PROPERTIES | - | |
| TYPE | - | |
| UNITY_BUILD | - | |
| UNITY_BUILD_BATCH_SIZE | - | |
| UNITY_BUILD_CODE_AFTER_INCLUDE | - | |
| UNITY_BUILD_CODE_BEFORE_INCLUDE | - | |
| UNITY_BUILD_FILENAME_PREFIX | - | |
| UNITY_BUILD_MODE | - | |
| UNITY_BUILD_RELOCATABLE | - | |
| UNITY_BUILD_UNIQUE_ID | - | |
| VERIFY_INTERFACE_HEADER_SETS | - | |
| VERSION | - | |
| VISIBILITY_INLINES_HIDDEN | - | |
| VS_CONFIGURATION_TYPE | - | |
| VS_DEBUGGER_COMMAND | - | |
| VS_DEBUGGER_COMMAND_ARGUMENTS | - | |
| VS_DEBUGGER_ENVIRONMENT | - | |
| VS_DEBUGGER_WORKING_DIRECTORY | - | |
| VS_DESKTOP_EXTENSIONS_VERSION | - | |
| VS_DOTNET_DOCUMENTATION_FILE | - | |
| VS_DOTNET_REFERENCE_<refname> | - | |
| VS_DOTNET_REFERENCEPROP_<refname>_TAG_<tagname> | - | |
| VS_DOTNET_REFERENCES | - | |
| VS_DOTNET_REFERENCES_COPY_LOCAL | - | |
| VS_DOTNET_STARTUP_OBJECT | - | |
| VS_DOTNET_TARGET_FRAMEWORK_VERSION | - | |
| VS_DPI_AWARE | - | |
| VS_FRAMEWORK_REFERENCES | - | |
| VS_GLOBAL_KEYWORD | - | |
| VS_GLOBAL_PROJECT_TYPES | - | |
| VS_GLOBAL_ROOTNAMESPACE | - | |
| VS_GLOBAL_<variable> | - | |
| VS_IOT_EXTENSIONS_VERSION | - | |
| VS_IOT_STARTUP_TASK | - | |
| VS_JUST_MY_CODE_DEBUGGING | - | |
| VS_KEYWORD | - | |
| VS_MOBILE_EXTENSIONS_VERSION | - | |
| VS_NO_COMPILE_BATCHING | - | |
| VS_NO_SOLUTION_DEPLOY | - | |
| VS_PACKAGE_REFERENCES | - | |
| VS_PLATFORM_TOOLSET | - | |
| VS_PROJECT_IMPORT | - | |
| VS_SCC_AUXPATH | - | |
| VS_SCC_LOCALPATH | - | |
| VS_SCC_PROJECTNAME | - | |
| VS_SCC_PROVIDER | - | |
| VS_SDK_REFERENCES | - | |
| VS_SOLUTION_DEPLOY | - | |
| VS_SOURCE_SETTINGS_<tool> | - | |
| VS_USE_DEBUG_LIBRARIES | - | |
| VS_USER_PROPS | - | |
| VS_FILTER_PROPS | - | |
| VS_WINDOWS_TARGET_PLATFORM_MIN_VERSION | - | |
| VS_WINRT_COMPONENT | - | |
| VS_WINRT_REFERENCES | - | |
| WATCOM_RUNTIME_LIBRARY | - | |
| WIN32_EXECUTABLE | - | |
| WINDOWS_EXPORT_ALL_SYMBOLS | - | |
| XCODE_ATTRIBUTE_<an-attribute> | - | |
| XCODE_EMBED_FRAMEWORKS_CODE_SIGN_ON_COPY | - | |
| XCODE_EMBED_FRAMEWORKS_REMOVE_HEADERS_ON_COPY | - | |
| XCODE_EMBED_<type> | - | |
| XCODE_EMBED_<type>_CODE_SIGN_ON_COPY | - | |
| XCODE_EMBED_<type>_PATH | - | |
| XCODE_EMBED_<type>_REMOVE_HEADERS_ON_COPY | - | |
| XCODE_EXPLICIT_FILE_TYPE | - | |
| XCODE_GENERATE_SCHEME | - | |
| XCODE_LINK_BUILD_PHASE_MODE | - | |
| XCODE_PRODUCT_TYPE | - | |
| XCODE_SCHEME_ADDRESS_SANITIZER | - | |
| XCODE_SCHEME_ADDRESS_SANITIZER_USE_AFTER_RETURN | - | |
| XCODE_SCHEME_ARGUMENTS | - | |
| XCODE_SCHEME_DEBUG_AS_ROOT | - | |
| XCODE_SCHEME_DEBUG_DOCUMENT_VERSIONING | - | |
| XCODE_SCHEME_DISABLE_MAIN_THREAD_CHECKER | - | |
| XCODE_SCHEME_DYNAMIC_LIBRARY_LOADS | - | |
| XCODE_SCHEME_DYNAMIC_LINKER_API_USAGE | - | |
| XCODE_SCHEME_ENABLE_GPU_API_VALIDATION | - | |
| XCODE_SCHEME_ENABLE_GPU_FRAME_CAPTURE_MODE | - | |
| XCODE_SCHEME_ENABLE_GPU_SHADER_VALIDATION | - | |
| XCODE_SCHEME_ENVIRONMENT | - | |
| XCODE_SCHEME_EXECUTABLE | - | |
| XCODE_SCHEME_GUARD_MALLOC | - | |
| XCODE_SCHEME_LAUNCH_CONFIGURATION | - | |
| XCODE_SCHEME_TEST_CONFIGURATION | - | |
| XCODE_SCHEME_LAUNCH_MODE | - | |
| XCODE_SCHEME_LLDB_INIT_FILE | - | |
| XCODE_SCHEME_MAIN_THREAD_CHECKER_STOP | - | |
| XCODE_SCHEME_MALLOC_GUARD_EDGES | - | |
| XCODE_SCHEME_MALLOC_SCRIBBLE | - | |
| XCODE_SCHEME_MALLOC_STACK | - | |
| XCODE_SCHEME_THREAD_SANITIZER | - | |
| XCODE_SCHEME_THREAD_SANITIZER_STOP | - | |
| XCODE_SCHEME_UNDEFINED_BEHAVIOUR_SANITIZER | - | |
| XCODE_SCHEME_UNDEFINED_BEHAVIOUR_SANITIZER_STOP | - | |
| XCODE_SCHEME_WORKING_DIRECTORY | - | |
| XCODE_SCHEME_ZOMBIE_OBJECTS | - | |
| XCODE_XCCONFIG | - | |
| XCTEST | - | |

### Tests

| Command | Supported | Remarks |
| - | - | - |
| ATTACHED_FILES | - | |
| ATTACHED_FILES_ON_FAIL | - | |
| COST | - | |
| DEPENDS | - | |
| DISABLED | - | |
| ENVIRONMENT | - | |
| ENVIRONMENT_MODIFICATION | - | |
| FAIL_REGULAR_EXPRESSION | - | |
| FIXTURES_CLEANUP | - | |
| FIXTURES_REQUIRED | - | |
| FIXTURES_SETUP | - | |
| GENERATED_RESOURCE_SPEC_FILE | - | |
| LABELS | - | |
| MEASUREMENT | - | |
| PASS_REGULAR_EXPRESSION | - | |
| PROCESSOR_AFFINITY | - | |
| PROCESSORS | - | |
| REQUIRED_FILES | - | |
| RESOURCE_GROUPS | - | |
| RESOURCE_LOCK | - | |
| RUN_SERIAL | - | |
| SKIP_REGULAR_EXPRESSION | - | |
| SKIP_RETURN_CODE | - | |
| TIMEOUT | - | |
| TIMEOUT_AFTER_MATCH | - | |
| TIMEOUT_SIGNAL_GRACE_PERIOD | - | |
| TIMEOUT_SIGNAL_NAME | - | |
| WILL_FAIL | - | |
| WORKING_DIRECTORY | - | |

### Source Files

| Command | Supported | Remarks |
| - | - | - |
| ABSTRACT | - | |
| AUTORCC_OPTIONS | - | |
| AUTOUIC_OPTIONS | - | |
| COMPILE_DEFINITIONS | - | |
| COMPILE_FLAGS | - | |
| COMPILE_OPTIONS | - | |
| CXX_SCAN_FOR_MODULES | - | |
| EXTERNAL_OBJECT | - | |
| Fortran_FORMAT | - | |
| Fortran_PREPROCESS | - | |
| GENERATED | - | |
| HEADER_FILE_ONLY | - | |
| INCLUDE_DIRECTORIES | - | |
| INSTALL_OBJECT_NAME | - | |
| KEEP_EXTENSION | - | |
| LABELS | - | |
| LANGUAGE | - | |
| LOCATION | - | |
| MACOSX_PACKAGE_LOCATION | - | |
| OBJECT_DEPENDS | - | |
| OBJECT_NAME | - | |
| OBJECT_OUTPUTS | - | |
| JOB_POOL_COMPILE | - | |
| SKIP_AUTOGEN | - | |
| SKIP_AUTOMOC | - | |
| SKIP_AUTORCC | - | |
| SKIP_AUTOUIC | - | |
| SKIP_LINTING | - | |
| SKIP_PRECOMPILE_HEADERS | - | |
| SKIP_UNITY_BUILD_INCLUSION | - | |
| Swift_DEPENDENCIES_FILE | - | |
| Swift_DIAGNOSTICS_FILE | - | |
| SYMBOLIC | - | |
| UNITY_GROUP | - | |
| VS_COPY_TO_OUT_DIR | - | |
| VS_CSHARP_<tagname> | - | |
| VS_CUSTOM_COMMAND_DISABLE_PARALLEL_BUILD | - | |
| VS_DEPLOYMENT_CONTENT | - | |
| VS_DEPLOYMENT_LOCATION | - | |
| VS_INCLUDE_IN_VSIX | - | |
| VS_RESOURCE_GENERATOR | - | |
| VS_SETTINGS | - | |
| VS_SHADER_DISABLE_OPTIMIZATIONS | - | |
| VS_SHADER_ENABLE_DEBUG | - | |
| VS_SHADER_ENTRYPOINT | - | |
| VS_SHADER_FLAGS | - | |
| VS_SHADER_MODEL | - | |
| VS_SHADER_OBJECT_FILE_NAME | - | |
| VS_SHADER_OUTPUT_HEADER_FILE | - | |
| VS_SHADER_TYPE | - | |
| VS_SHADER_VARIABLE_NAME | - | |
| VS_TOOL_OVERRIDE | - | |
| VS_XAML_TYPE | - | |
| WRAP_EXCLUDE | - | |
| XCODE_EXPLICIT_FILE_TYPE | - | |
| XCODE_FILE_ATTRIBUTES | - | |
| XCODE_LAST_KNOWN_FILE_TYPE | - | |

### Cache Entries

| Command | Supported | Remarks |
| - | - | - |
| ADVANCED | - | |
| HELPSTRING | - | |
| MODIFIED | - | |
| STRINGS | - | |
| TYPE | - | |
| VALUE | - | |

### Installed Files

| Command | Supported | Remarks |
| - | - | - |
| CPACK_DESKTOP_SHORTCUTS | - | |
| CPACK_NEVER_OVERWRITE | - | |
| CPACK_PERMANENT | - | |
| CPACK_START_MENU_SHORTCUTS | - | |
| CPACK_STARTUP_SHORTCUTS | - | |
| CPACK_WIX_ACL | - | |

### Deprecated on Directories

| Command | Supported | Remarks |
| - | - | - |
| ADDITIONAL_MAKE_CLEAN_FILES | - | |
| COMPILE_DEFINITIONS_<CONFIG> | - | |
| INTERPROCEDURAL_OPTIMIZATION | - | |
| INTERPROCEDURAL_OPTIMIZATION_<CONFIG> | - | |
| TEST_INCLUDE_FILE | - | |

### Deprecated on Targets

| Command | Supported | Remarks |
| - | - | - |
| COMPILE_DEFINITIONS_<CONFIG> | - | |
| Fortran_BUILDING_INSTRINSIC_MODULES | - | |
| IMPORTED_NO_SYSTEM | - | |
| IOS_INSTALL_COMBINED | - | |
| POST_INSTALL_SCRIPT | - | |
| PRE_INSTALL_SCRIPT | - | |
| VS_WINRT_EXTENSIONS | - | |

### Deprecated Properties on Source Files

| Command | Supported | Remarks |
| - | - | - |
| COMPILE_DEFINITIONS_<CONFIG> | - | |

## Variables

https://cmake.org/cmake/help/latest/manual/cmake-variables.7.html

### Provide Information

| Command | Supported | Remarks |
| - | - | - |
| Variable | Supported | Depend on |
| - | - |
| CMAKE_AR | - | |
| CMAKE_ARGC | - | |
| CMAKE_ARGV0 | - | |
| CMAKE_BINARY_DIR | - | |
| CMAKE_BUILD_TOOL | - | |
| CMAKE_CACHE_MAJOR_VERSION | - | |
| CMAKE_CACHE_MINOR_VERSION | - | |
| CMAKE_CACHE_PATCH_VERSION | - | |
| CMAKE_CACHEFILE_DIR | - | |
| CMAKE_COMMAND | - | |
| CMAKE_CPACK_COMMAND | - | |
| CMAKE_CROSSCOMPILING | - | |
| CMAKE_CROSSCOMPILING_EMULATOR | - | |
| CMAKE_CTEST_COMMAND | - | |
| CMAKE_CURRENT_BINARY_DIR | - | |
| CMAKE_CURRENT_FUNCTION | - | |
| CMAKE_CURRENT_FUNCTION_LIST_DIR | - | |
| CMAKE_CURRENT_FUNCTION_LIST_FILE | - | |
| CMAKE_CURRENT_FUNCTION_LIST_LINE | - | |
| CMAKE_CURRENT_LIST_DIR | - | |
| CMAKE_CURRENT_LIST_FILE | - | |
| CMAKE_CURRENT_LIST_LINE | - | |
| CMAKE_CURRENT_SOURCE_DIR | - | |
| CMAKE_CXX_STDLIB_MODULES_JSON | - | |
| CMAKE_DEBUG_TARGET_PROPERTIES | - | |
| CMAKE_DIRECTORY_LABELS | - | |
| CMAKE_DL_LIBS | - | |
| CMAKE_DOTNET_SDK | - | |
| CMAKE_DOTNET_TARGET_FRAMEWORK | - | |
| CMAKE_DOTNET_TARGET_FRAMEWORK_VERSION | - | |
| CMAKE_EDIT_COMMAND | - | |
| CMAKE_EXECUTABLE_SUFFIX | - | |
| CMAKE_EXECUTABLE_SUFFIX_<LANG> | - | |
| CMAKE_EXTRA_SHARED_LIBRARY_SUFFIXES | - | |
| CMAKE_FASTBUILD_CACHE_PATH | - | |
| CMAKE_FASTBUILD_CAPTURE_SYSTEM_ENV | - | |
| CMAKE_FASTBUILD_COMPILER_EXTRA_FILES | - | |
| CMAKE_FASTBUILD_ENV_OVERRIDES | - | |
| CMAKE_FASTBUILD_TRACK_BYPRODUCTS_AS_OUTPUT | - | |
| CMAKE_FASTBUILD_ALLOW_RESPONSE_FILE | - | |
| CMAKE_FASTBUILD_CLANG_GCC_UPDATE_XLANG_ARG | - | |
| CMAKE_FASTBUILD_CLANG_REWRITE_INCLUDES | - | |
| CMAKE_FASTBUILD_FORCE_RESPONSE_FILE | - | |
| CMAKE_FASTBUILD_IDE_ARGS | - | |
| CMAKE_FASTBUILD_SOURCE_MAPPING | - | |
| CMAKE_FASTBUILD_USE_DETERMINISTIC_PATHS | - | |
| CMAKE_FASTBUILD_USE_LIGHTCACHE | - | |
| CMAKE_FASTBUILD_USE_RELATIVE_PATHS | - | |
| CMAKE_FASTBUILD_VERBOSE_GENERATOR | - | |
| CMAKE_FIND_DEBUG_MODE | - | |
| CMAKE_FIND_DEBUG_MODE_NO_IMPLICIT_CONFIGURE_LOG | - | |
| CMAKE_FIND_PACKAGE_NAME | - | |
| CMAKE_FIND_PACKAGE_REDIRECTS_DIR | - | |
| CMAKE_FIND_PACKAGE_SORT_DIRECTION | - | |
| CMAKE_FIND_PACKAGE_SORT_ORDER | - | |
| CMAKE_FIND_REQUIRED | - | |
| CMAKE_GENERATOR | - | |
| CMAKE_GENERATOR_INSTANCE | - | |
| CMAKE_GENERATOR_PLATFORM | - | |
| CMAKE_GENERATOR_TOOLSET | - | |
| CMAKE_IMPORT_LIBRARY_PREFIX | - | |
| CMAKE_IMPORT_LIBRARY_SUFFIX | - | |
| CMAKE_JOB_POOL_COMPILE | - | |
| CMAKE_JOB_POOL_LINK | - | |
| CMAKE_JOB_POOL_PRECOMPILE_HEADER | - | |
| CMAKE_JOB_POOLS | - | |
| CMAKE_<LANG>_COMPILER_AR | - | |
| CMAKE_<LANG>_COMPILER_ARCHITECTURE_ID | - | |
| CMAKE_<LANG>_COMPILER_FRONTEND_VARIANT | - | |
| CMAKE_<LANG>_COMPILER_LINKER | - | |
| CMAKE_<LANG>_COMPILER_LINKER_FRONTEND_VARIANT | - | |
| CMAKE_<LANG>_COMPILER_LINKER_ID | - | |
| CMAKE_<LANG>_COMPILER_LINKER_VERSION | - | |
| CMAKE_<LANG>_COMPILER_RANLIB | - | |
| CMAKE_<LANG>_DEVICE_LINK_MODE | - | |
| CMAKE_<LANG>_LINK_LIBRARY_SUFFIX | - | |
| CMAKE_<LANG>_LINK_MODE | - | |
| CMAKE_LINK_LIBRARY_SUFFIX | - | |
| CMAKE_LINK_SEARCH_END_STATIC | - | |
| CMAKE_LINK_SEARCH_START_STATIC | - | |
| CMAKE_LIST_FILE_NAME | - | |
| CMAKE_MAJOR_VERSION | - | |
| CMAKE_MAKE_PROGRAM | - | |
| CMAKE_MATCH_COUNT | - | |
| CMAKE_MATCH_<n> | - | |
| CMAKE_MINIMUM_REQUIRED_VERSION | - | |
| CMAKE_MINOR_VERSION | - | |
| CMAKE_NETRC | - | |
| CMAKE_NETRC_FILE | - | |
| CMAKE_OBJDUMP | - | |
| CMAKE_PARENT_LIST_FILE | - | |
| CMAKE_PATCH_VERSION | - | |
| CMAKE_PROJECT_COMPAT_VERSION | 4.2 | `project([COMPAT_VERSION])` |
| CMAKE_PROJECT_DESCRIPTION | 4.2 | `project([DESCRIPTION])` |
| CMAKE_PROJECT_HOMEPAGE_URL | 4.2 | `project([HOMEPAGE_URL])` |
| CMAKE_PROJECT_NAME | 4.2 | `project(<PROJECT-NAME>)` |
| CMAKE_PROJECT_SPDX_LICENSE | 4.2 | `project(<SPDX_LICENSE>)` |
| CMAKE_PROJECT_VERSION | 4.2 | `project([VERSION])` |
| CMAKE_PROJECT_VERSION_MAJOR | 4.2 | `project([VERSION])` |
| CMAKE_PROJECT_VERSION_MINOR | 4.2 | `project([VERSION])` |
| CMAKE_PROJECT_VERSION_PATCH | 4.2 | `project([VERSION])` |
| CMAKE_PROJECT_VERSION_TWEAK | 4.2 | `project([VERSION])` |
| CMAKE_RANLIB | - | |
| CMAKE_ROOT | - | |
| CMAKE_RULE_MESSAGES | - | |
| CMAKE_SCRIPT_MODE_FILE | - | |
| CMAKE_SHARED_LIBRARY_PREFIX | - | |
| CMAKE_SHARED_LIBRARY_SUFFIX | - | |
| CMAKE_SHARED_LIBRARY_ARCHIVE_SUFFIX | - | |
| CMAKE_SHARED_MODULE_PREFIX | - | |
| CMAKE_SHARED_MODULE_SUFFIX | - | |
| CMAKE_SIZEOF_VOID_P | - | |
| CMAKE_SKIP_INSTALL_RULES | - | |
| CMAKE_SKIP_RPATH | - | |
| CMAKE_SOURCE_DIR | - | |
| CMAKE_STATIC_LIBRARY_PREFIX | - | |
| CMAKE_STATIC_LIBRARY_SUFFIX | - | |
| CMAKE_Swift_COMPILATION_MODE | - | |
| CMAKE_Swift_MODULE_DIRECTORY | - | |
| CMAKE_Swift_NUM_THREADS | - | |
| CMAKE_TEST_LAUNCHER | - | |
| CMAKE_TOOLCHAIN_FILE | - | |
| CMAKE_TWEAK_VERSION | - | |
| CMAKE_VERBOSE_MAKEFILE | - | |
| CMAKE_VERSION | - | |
| CMAKE_VS_DEVENV_COMMAND | - | |
| CMAKE_VS_MSBUILD_COMMAND | - | |
| CMAKE_VS_NsightTegra_VERSION | - | |
| CMAKE_VS_NUGET_PACKAGE_RESTORE | - | |
| CMAKE_VS_PLATFORM_NAME | - | |
| CMAKE_VS_PLATFORM_NAME_DEFAULT | - | |
| CMAKE_VS_PLATFORM_TOOLSET | - | |
| CMAKE_VS_PLATFORM_TOOLSET_CUDA | - | |
| CMAKE_VS_PLATFORM_TOOLSET_CUDA_CUSTOM_DIR | - | |
| CMAKE_VS_PLATFORM_TOOLSET_FORTRAN | - | |
| CMAKE_VS_PLATFORM_TOOLSET_HOST_ARCHITECTURE | - | |
| CMAKE_VS_PLATFORM_TOOLSET_VERSION | - | |
| CMAKE_VS_TARGET_FRAMEWORK_IDENTIFIER | - | |
| CMAKE_VS_TARGET_FRAMEWORK_TARGETS_VERSION | - | |
| CMAKE_VS_TARGET_FRAMEWORK_VERSION | - | |
| CMAKE_VS_USE_DEBUG_LIBRARIES | - | |
| CMAKE_VS_VERSION_BUILD_NUMBER | - | |
| CMAKE_VS_WINDOWS_TARGET_PLATFORM_MIN_VERSION | - | |
| CMAKE_VS_WINDOWS_TARGET_PLATFORM_VERSION | - | |
| CMAKE_VS_WINDOWS_TARGET_PLATFORM_VERSION_MAXIMUM | - | |
| CMAKE_WINDOWS_KMDF_VERSION | - | |
| CMAKE_XCODE_BUILD_SYSTEM | - | |
| CMAKE_XCODE_PLATFORM_TOOLSET | - | |
| <PROJECT-NAME>_BINARY_DIR | 4.2 | `project` |
| <PROJECT-NAME>_COMPAT_VERSION | 4.2 | `project([COMPAT_VERSION])` |
| <PROJECT-NAME>_DESCRIPTION | 4.2 | `project([DESCRIPTION])` |
| <PROJECT-NAME>_HOMEPAGE_URL | 4.2 | `project([HOMEPAGE_URL])` |
| <PROJECT-NAME>_IS_TOP_LEVEL | 4.2 | `project` |
| <PROJECT-NAME>_SOURCE_DIR | 4.2 | `project` |
| <PROJECT-NAME>_SPDX_LICENSE | 4.2 | `project(<SPDX_LICENSE>)` |
| <PROJECT-NAME>_VERSION | 4.2 | `project([VERSION])` |
| <PROJECT-NAME>_VERSION_MAJOR | 4.2 | `project([VERSION])` |
| <PROJECT-NAME>_VERSION_MINOR | 4.2 | `project([VERSION])` |
| <PROJECT-NAME>_VERSION_PATCH | 4.2 | `project([VERSION])` |
| <PROJECT-NAME>_VERSION_TWEAK | 4.2 | `project([VERSION])` |
| PROJECT_BINARY_DIR | 4.2 | `project` |
| PROJECT_COMPAT_VERSION | 4.2 | `project([COMPAT_VERSION])` |
| PROJECT_DESCRIPTION | 4.2 | `project([DESCRIPTION])` |
| PROJECT_HOMEPAGE_URL | 4.2 | `project([HOMEPAGE_URL])` |
| PROJECT_IS_TOP_LEVEL | 4.2 | `project` |
| PROJECT_NAME | 4.2 | `project(<PROJECT-NAME>)` |
| PROJECT_SOURCE_DIR | 4.2 | `project` |
| PROJECT_SPDX_LICENSE | 4.2 | `project(<SPDX_LICENSE>)` |
| PROJECT_VERSION | 4.2 | `project([VERSION])` |
| PROJECT_VERSION_MAJOR | 4.2 | `project([VERSION])` |
| PROJECT_VERSION_MINOR | 4.2 | `project([VERSION])` |
| PROJECT_VERSION_PATCH | 4.2 | `project([VERSION])` |
| PROJECT_VERSION_TWEAK | 4.2 | `project([VERSION])` |

### Change Behavior

| Command | Supported | Remarks |
| - | - | - |
| BUILD_SHARED_LIBS | - | |
| BUILD_TESTING | - | |
| CMAKE_ABSOLUTE_DESTINATION_FILES | - | |
| CMAKE_ADD_CUSTOM_COMMAND_DEPENDS_EXPLICIT_ONLY | - | |
| CMAKE_APPBUNDLE_PATH | - | |
| CMAKE_AUTOGEN_INTERMEDIATE_DIR_STRATEGY | - | |
| CMAKE_BUILD_TYPE | - | |
| CMAKE_CLANG_VFS_OVERLAY | - | |
| CMAKE_CODEBLOCKS_COMPILER_ID | - | |
| CMAKE_CODEBLOCKS_EXCLUDE_EXTERNAL_FILES | - | |
| CMAKE_CODELITE_USE_TARGETS | - | |
| CMAKE_COLOR_DIAGNOSTICS | - | |
| CMAKE_COLOR_MAKEFILE | - | |
| CMAKE_CONFIGURATION_TYPES | - | |
| CMAKE_DEPENDS_IN_PROJECT_ONLY | - | |
| CMAKE_DISABLE_FIND_PACKAGE_<PackageName> | - | |
| CMAKE_ECLIPSE_GENERATE_LINKED_RESOURCES | - | |
| CMAKE_ECLIPSE_GENERATE_SOURCE_PROJECT | - | |
| CMAKE_ECLIPSE_MAKE_ARGUMENTS | - | |
| CMAKE_ECLIPSE_RESOURCE_ENCODING | - | |
| CMAKE_ECLIPSE_VERSION | - | |
| CMAKE_ERROR_DEPRECATED | - | |
| CMAKE_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION | - | |
| CMAKE_EXECUTE_PROCESS_COMMAND_ECHO | - | |
| CMAKE_EXECUTE_PROCESS_COMMAND_ERROR_IS_FATAL | - | |
| CMAKE_EXPORT_BUILD_DATABASE | - | |
| CMAKE_EXPORT_COMPILE_COMMANDS | - | |
| CMAKE_EXPORT_SARIF | - | |
| CMAKE_EXPORT_PACKAGE_REGISTRY | - | |
| CMAKE_EXPORT_NO_PACKAGE_REGISTRY | - | |
| CMAKE_FIND_APPBUNDLE | - | |
| CMAKE_FIND_FRAMEWORK | - | |
| CMAKE_FIND_LIBRARY_CUSTOM_LIB_SUFFIX | - | |
| CMAKE_FIND_LIBRARY_PREFIXES | - | |
| CMAKE_FIND_LIBRARY_SUFFIXES | - | |
| CMAKE_FIND_NO_INSTALL_PREFIX | - | |
| CMAKE_FIND_PACKAGE_PREFER_CONFIG | - | |
| CMAKE_FIND_PACKAGE_RESOLVE_SYMLINKS | - | |
| CMAKE_FIND_PACKAGE_TARGETS_GLOBAL | - | |
| CMAKE_FIND_PACKAGE_WARN_NO_MODULE | - | |
| CMAKE_FIND_ROOT_PATH | - | |
| CMAKE_FIND_ROOT_PATH_MODE_INCLUDE | - | |
| CMAKE_FIND_ROOT_PATH_MODE_LIBRARY | - | |
| CMAKE_FIND_ROOT_PATH_MODE_PACKAGE | - | |
| CMAKE_FIND_ROOT_PATH_MODE_PROGRAM | - | |
| CMAKE_FIND_USE_CMAKE_ENVIRONMENT_PATH | - | |
| CMAKE_FIND_USE_CMAKE_PATH | - | |
| CMAKE_FIND_USE_CMAKE_SYSTEM_PATH | - | |
| CMAKE_FIND_USE_INSTALL_PREFIX | - | |
| CMAKE_FIND_USE_PACKAGE_REGISTRY | - | |
| CMAKE_FIND_USE_PACKAGE_ROOT_PATH | - | |
| CMAKE_FIND_USE_SYSTEM_ENVIRONMENT_PATH | - | |
| CMAKE_FIND_USE_SYSTEM_PACKAGE_REGISTRY | - | |
| CMAKE_FRAMEWORK_PATH | - | |
| CMAKE_IGNORE_PATH | - | |
| CMAKE_IGNORE_PREFIX_PATH | - | |
| CMAKE_INCLUDE_DIRECTORIES_BEFORE | - | |
| CMAKE_INCLUDE_DIRECTORIES_PROJECT_BEFORE | - | |
| CMAKE_INCLUDE_PATH | - | |
| CMAKE_INSTALL_DEFAULT_COMPONENT_NAME | - | |
| CMAKE_INSTALL_DEFAULT_DIRECTORY_PERMISSIONS | - | |
| CMAKE_INSTALL_MESSAGE | - | |
| CMAKE_INSTALL_PREFIX | - | |
| CMAKE_INSTALL_PREFIX_INITIALIZED_TO_DEFAULT | - | |
| CMAKE_KATE_FILES_MODE | - | |
| CMAKE_KATE_MAKE_ARGUMENTS | - | |
| CMAKE_LIBRARY_PATH | - | |
| CMAKE_LINK_DIRECTORIES_BEFORE | - | |
| CMAKE_LINK_LIBRARIES_ONLY_TARGETS | - | |
| CMAKE_MAXIMUM_RECURSION_DEPTH | - | |
| CMAKE_MESSAGE_CONTEXT | - | |
| CMAKE_MESSAGE_CONTEXT_SHOW | - | |
| CMAKE_MESSAGE_INDENT | - | |
| CMAKE_MESSAGE_LOG_LEVEL | - | |
| CMAKE_MFC_FLAG | - | |
| CMAKE_MODULE_PATH | - | |
| CMAKE_INTERMEDIATE_DIR_STRATEGY | - | |
| CMAKE_PKG_CONFIG_DISABLE_UNINSTALLED | - | |
| CMAKE_PKG_CONFIG_PC_LIB_DIRS | - | |
| CMAKE_PKG_CONFIG_PC_PATH | - | |
| CMAKE_PKG_CONFIG_SYSROOT_DIR | - | |
| CMAKE_PKG_CONFIG_TOP_BUILD_DIR | - | |
| CMAKE_POLICY_DEFAULT_CMP<NNNN> | - | |
| CMAKE_POLICY_VERSION_MINIMUM | - | |
| CMAKE_POLICY_WARNING_CMP<NNNN> | - | |
| CMAKE_PREFIX_PATH | - | |
| CMAKE_PROGRAM_PATH | - | |
| CMAKE_PROJECT_INCLUDE | - | |
| CMAKE_PROJECT_INCLUDE_BEFORE | - | |
| CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE | - | |
| CMAKE_PROJECT_<PROJECT-NAME>_INCLUDE_BEFORE | - | |
| CMAKE_PROJECT_TOP_LEVEL_INCLUDES | - | |
| CMAKE_REQUIRE_FIND_PACKAGE_<PackageName> | - | |
| CMAKE_SKIP_INSTALL_ALL_DEPENDENCY | - | |
| CMAKE_SKIP_TEST_ALL_DEPENDENCY | - | |
| CMAKE_STAGING_PREFIX | - | |
| CMAKE_SUBLIME_TEXT_2_ENV_SETTINGS | - | |
| CMAKE_SUBLIME_TEXT_2_EXCLUDE_BUILD_TREE | - | |
| CMAKE_SUPPRESS_REGENERATION | - | |
| CMAKE_SYSROOT | - | |
| CMAKE_SYSROOT_COMPILE | - | |
| CMAKE_SYSROOT_LINK | - | |
| CMAKE_SYSTEM_APPBUNDLE_PATH | - | |
| CMAKE_SYSTEM_FRAMEWORK_PATH | - | |
| CMAKE_SYSTEM_IGNORE_PATH | - | |
| CMAKE_SYSTEM_IGNORE_PREFIX_PATH | - | |
| CMAKE_SYSTEM_INCLUDE_PATH | - | |
| CMAKE_SYSTEM_LIBRARY_PATH | - | |
| CMAKE_SYSTEM_PREFIX_PATH | - | |
| CMAKE_SYSTEM_PROGRAM_PATH | - | |
| CMAKE_TLS_CAINFO | - | |
| CMAKE_TLS_VERIFY | - | |
| CMAKE_TLS_VERSION | - | |
| CMAKE_USER_MAKE_RULES_OVERRIDE | - | |
| CMAKE_WARN_DEPRECATED | - | |
| CMAKE_WARN_ON_ABSOLUTE_INSTALL_DESTINATION | - | |
| CMAKE_XCODE_GENERATE_SCHEME | - | |
| CMAKE_XCODE_GENERATE_TOP_LEVEL_PROJECT_ONLY | - | |
| CMAKE_XCODE_LINK_BUILD_PHASE_MODE | - | |
| CMAKE_XCODE_SCHEME_ADDRESS_SANITIZER | - | |
| CMAKE_XCODE_SCHEME_ADDRESS_SANITIZER_USE_AFTER_RETURN | - | |
| CMAKE_XCODE_SCHEME_DEBUG_DOCUMENT_VERSIONING | - | |
| CMAKE_XCODE_SCHEME_DISABLE_MAIN_THREAD_CHECKER | - | |
| CMAKE_XCODE_SCHEME_DYNAMIC_LIBRARY_LOADS | - | |
| CMAKE_XCODE_SCHEME_DYNAMIC_LINKER_API_USAGE | - | |
| CMAKE_XCODE_SCHEME_ENABLE_GPU_API_VALIDATION | - | |
| CMAKE_XCODE_SCHEME_ENABLE_GPU_FRAME_CAPTURE_MODE | - | |
| CMAKE_XCODE_SCHEME_ENABLE_GPU_SHADER_VALIDATION | - | |
| CMAKE_XCODE_SCHEME_ENVIRONMENT | - | |
| CMAKE_XCODE_SCHEME_GUARD_MALLOC | - | |
| CMAKE_XCODE_SCHEME_LAUNCH_CONFIGURATION | - | |
| CMAKE_XCODE_SCHEME_TEST_CONFIGURATION | - | |
| CMAKE_XCODE_SCHEME_LAUNCH_MODE | - | |
| CMAKE_XCODE_SCHEME_LLDB_INIT_FILE | - | |
| CMAKE_XCODE_SCHEME_MAIN_THREAD_CHECKER_STOP | - | |
| CMAKE_XCODE_SCHEME_MALLOC_GUARD_EDGES | - | |
| CMAKE_XCODE_SCHEME_MALLOC_SCRIBBLE | - | |
| CMAKE_XCODE_SCHEME_MALLOC_STACK | - | |
| CMAKE_XCODE_SCHEME_THREAD_SANITIZER | - | |
| CMAKE_XCODE_SCHEME_THREAD_SANITIZER_STOP | - | |
| CMAKE_XCODE_SCHEME_UNDEFINED_BEHAVIOUR_SANITIZER | - | |
| CMAKE_XCODE_SCHEME_UNDEFINED_BEHAVIOUR_SANITIZER_STOP | - | |
| CMAKE_XCODE_SCHEME_WORKING_DIRECTORY | - | |
| CMAKE_XCODE_SCHEME_ZOMBIE_OBJECTS | - | |
| CMAKE_XCODE_XCCONFIG | - | |
| <PackageName>_ROOT | - | |

### Describe the System

| Command | Supported | Remarks |
| - | - | - |
| AIX | - | |
| ANDROID | - | |
| APPLE | - | |
| BORLAND | - | |
| BSD | - | |
| CMAKE_ANDROID_NDK_VERSION | - | |
| CMAKE_CL_64 | - | |
| CMAKE_COMPILER_2005 | - | |
| CMAKE_HOST_APPLE | - | |
| CMAKE_HOST_AIX | - | |
| CMAKE_HOST_BSD | - | |
| CMAKE_HOST_EXECUTABLE_SUFFIX | - | |
| CMAKE_HOST_LINUX | - | |
| CMAKE_HOST_SOLARIS | - | |
| CMAKE_HOST_SYSTEM | - | |
| CMAKE_HOST_SYSTEM_NAME | - | |
| CMAKE_HOST_SYSTEM_PROCESSOR | - | |
| CMAKE_HOST_SYSTEM_VERSION | - | |
| CMAKE_HOST_UNIX | - | |
| CMAKE_HOST_WIN32 | - | |
| CMAKE_LIBRARY_ARCHITECTURE | - | |
| CMAKE_LIBRARY_ARCHITECTURE_REGEX | - | |
| CMAKE_OBJECT_PATH_MAX | - | |
| CMAKE_SYSTEM | - | |
| CMAKE_SYSTEM_NAME | - | |
| CMAKE_SYSTEM_PROCESSOR | - | |
| CMAKE_SYSTEM_VERSION | - | |
| CYGWIN | - | |
| GHSMULTI | - | |
| IOS | - | |
| LINUX | - | |
| MINGW | - | |
| MSVC | - | |
| MSVC_IDE | - | |
| MSVC_TOOLSET_VERSION | - | |
| MSVC_VERSION | - | |
| MSYS | - | |
| UNIX | - | |
| WASI | - | |
| WIN32 | - | |
| WINCE | - | |
| WINDOWS_PHONE | - | |
| WINDOWS_STORE | - | |
| XCODE | - | |
| XCODE_VERSION | - | |

### Control the Build

| Command | Supported | Remarks |
| - | - | - |
| CMAKE_ADSP_ROOT | - | |
| CMAKE_AIX_SHARED_LIBRARY_ARCHIVE | - | |
| CMAKE_AIX_EXPORT_ALL_SYMBOLS | - | |
| CMAKE_ANDROID_ANT_ADDITIONAL_OPTIONS | - | |
| CMAKE_ANDROID_API | - | |
| CMAKE_ANDROID_API_MIN | - | |
| CMAKE_ANDROID_ARCH | - | |
| CMAKE_ANDROID_ARCH_ABI | - | |
| CMAKE_ANDROID_ARM_MODE | - | |
| CMAKE_ANDROID_ARM_NEON | - | |
| CMAKE_ANDROID_ASSETS_DIRECTORIES | - | |
| CMAKE_ANDROID_EXCEPTIONS | - | |
| CMAKE_ANDROID_GUI | - | |
| CMAKE_ANDROID_JAR_DEPENDENCIES | - | |
| CMAKE_ANDROID_JAR_DIRECTORIES | - | |
| CMAKE_ANDROID_JAVA_SOURCE_DIR | - | |
| CMAKE_ANDROID_NATIVE_LIB_DEPENDENCIES | - | |
| CMAKE_ANDROID_NATIVE_LIB_DIRECTORIES | - | |
| CMAKE_ANDROID_NDK | - | |
| CMAKE_ANDROID_NDK_DEPRECATED_HEADERS | - | |
| CMAKE_ANDROID_NDK_TOOLCHAIN_HOST_TAG | - | |
| CMAKE_ANDROID_NDK_TOOLCHAIN_VERSION | - | |
| CMAKE_ANDROID_PROCESS_MAX | - | |
| CMAKE_ANDROID_PROGUARD | - | |
| CMAKE_ANDROID_PROGUARD_CONFIG_PATH | - | |
| CMAKE_ANDROID_RTTI | - | |
| CMAKE_ANDROID_SECURE_PROPS_PATH | - | |
| CMAKE_ANDROID_SKIP_ANT_STEP | - | |
| CMAKE_ANDROID_STANDALONE_TOOLCHAIN | - | |
| CMAKE_ANDROID_STL_TYPE | - | |
| CMAKE_APPLE_SILICON_PROCESSOR | - | |
| CMAKE_ARCHIVE_OUTPUT_DIRECTORY | - | |
| CMAKE_ARCHIVE_OUTPUT_DIRECTORY_<CONFIG> | - | |
| CMAKE_AUTOGEN_BETTER_GRAPH_MULTI_CONFIG | - | |
| CMAKE_AUTOGEN_COMMAND_LINE_LENGTH_MAX | - | |
| CMAKE_AUTOGEN_ORIGIN_DEPENDS | - | |
| CMAKE_AUTOGEN_PARALLEL | - | |
| CMAKE_AUTOGEN_USE_SYSTEM_INCLUDE | - | |
| CMAKE_AUTOGEN_VERBOSE | - | |
| CMAKE_AUTOMOC | - | |
| CMAKE_AUTOMOC_COMPILER_PREDEFINES | - | |
| CMAKE_AUTOMOC_DEPEND_FILTERS | - | |
| CMAKE_AUTOMOC_INCLUDE_DIRECTORIES | - | |
| CMAKE_AUTOMOC_MACRO_NAMES | - | |
| CMAKE_AUTOMOC_MOC_OPTIONS | - | |
| CMAKE_AUTOMOC_PATH_PREFIX | - | |
| CMAKE_AUTOMOC_EXECUTABLE | - | |
| CMAKE_AUTORCC | - | |
| CMAKE_AUTORCC_OPTIONS | - | |
| CMAKE_AUTORCC_EXECUTABLE | - | |
| CMAKE_AUTOUIC | - | |
| CMAKE_AUTOUIC_OPTIONS | - | |
| CMAKE_AUTOUIC_SEARCH_PATHS | - | |
| CMAKE_AUTOUIC_EXECUTABLE | - | |
| CMAKE_BUILD_RPATH | - | |
| CMAKE_BUILD_RPATH_USE_ORIGIN | - | |
| CMAKE_BUILD_WITH_INSTALL_NAME_DIR | - | |
| CMAKE_BUILD_WITH_INSTALL_RPATH | - | |
| CMAKE_COMPILE_PDB_OUTPUT_DIRECTORY | - | |
| CMAKE_COMPILE_PDB_OUTPUT_DIRECTORY_<CONFIG> | - | |
| CMAKE_COMPILE_WARNING_AS_ERROR | - | |
| CMAKE_<CONFIG>_POSTFIX | - | |
| CMAKE_CROSS_CONFIGS | - | |
| CMAKE_CTEST_ARGUMENTS | - | |
| CMAKE_CUDA_RESOLVE_DEVICE_SYMBOLS | - | |
| CMAKE_CUDA_RUNTIME_LIBRARY | - | |
| CMAKE_CUDA_SEPARABLE_COMPILATION | - | |
| CMAKE_CXX_MODULE_STD | - | |
| CMAKE_CXX_SCAN_FOR_MODULES | - | |
| CMAKE_DEBUG_POSTFIX | - | |
| CMAKE_DEBUGGER_WORKING_DIRECTORY | - | |
| CMAKE_DEFAULT_BUILD_TYPE | - | |
| CMAKE_DEFAULT_CONFIGS | - | |
| CMAKE_DEPENDS_USE_COMPILER | - | |
| CMAKE_DISABLE_PRECOMPILE_HEADERS | - | |
| CMAKE_DLL_NAME_WITH_SOVERSION | - | |
| CMAKE_ENABLE_EXPORTS | - | |
| CMAKE_EXECUTABLE_ENABLE_EXPORTS | - | |
| CMAKE_EXE_LINKER_FLAGS | - | |
| CMAKE_EXE_LINKER_FLAGS_<CONFIG> | - | |
| CMAKE_EXE_LINKER_FLAGS_<CONFIG>_INIT | - | |
| CMAKE_EXE_LINKER_FLAGS_INIT | - | |
| CMAKE_EXPORT_FIND_PACKAGE_NAME | - | |
| CMAKE_FOLDER | - | |
| CMAKE_Fortran_FORMAT | - | |
| CMAKE_Fortran_MODULE_DIRECTORY | - | |
| CMAKE_Fortran_PREPROCESS | - | |
| CMAKE_FRAMEWORK | - | |
| CMAKE_FRAMEWORK_MULTI_CONFIG_POSTFIX_<CONFIG> | - | |
| CMAKE_GHS_NO_SOURCE_GROUP_FILE | - | |
| CMAKE_GLOBAL_AUTOGEN_TARGET | - | |
| CMAKE_GLOBAL_AUTOGEN_TARGET_NAME | - | |
| CMAKE_GLOBAL_AUTORCC_TARGET | - | |
| CMAKE_GLOBAL_AUTORCC_TARGET_NAME | - | |
| CMAKE_GNUtoMS | - | |
| CMAKE_INCLUDE_CURRENT_DIR | - | |
| CMAKE_INCLUDE_CURRENT_DIR_IN_INTERFACE | - | |
| CMAKE_INSTALL_NAME_DIR | - | |
| CMAKE_INSTALL_OBJECT_NAME_STRATEGY | - | |
| CMAKE_INSTALL_OBJECT_ONLY_USE_DESTINATION | - | |
| CMAKE_INSTALL_REMOVE_ENVIRONMENT_RPATH | - | |
| CMAKE_INSTALL_RPATH | - | |
| CMAKE_INSTALL_RPATH_USE_LINK_PATH | - | |
| CMAKE_INTERPROCEDURAL_OPTIMIZATION | - | |
| CMAKE_INTERPROCEDURAL_OPTIMIZATION_<CONFIG> | - | |
| CMAKE_<LANG>_CLANG_TIDY | - | |
| CMAKE_<LANG>_CLANG_TIDY_EXPORT_FIXES_DIR | - | |
| CMAKE_<LANG>_COMPILER_LAUNCHER | - | |
| CMAKE_<LANG>_CPPCHECK | - | |
| CMAKE_<LANG>_CPPLINT | - | |
| CMAKE_<LANG>_LINK_DEF_FILE_FLAG | - | |
| CMAKE_<LANG>_ICSTAT | - | |
| CMAKE_<LANG>_INCLUDE_WHAT_YOU_USE | - | |
| CMAKE_<LANG>_LINK_GROUP_USING_<FEATURE> | - | |
| CMAKE_<LANG>_LINK_GROUP_USING_<FEATURE>_SUPPORTED | - | |
| CMAKE_<LANG>_LINK_LIBRARY_<FEATURE>_ATTRIBUTES | - | |
| CMAKE_<LANG>_LINK_LIBRARY_FILE_FLAG | - | |
| CMAKE_<LANG>_LINK_LIBRARY_FLAG | - | |
| CMAKE_<LANG>_LINK_LIBRARY_USING_<FEATURE> | - | |
| CMAKE_<LANG>_LINK_LIBRARY_USING_<FEATURE>_SUPPORTED | - | |
| CMAKE_<LANG>_LINK_WHAT_YOU_USE_FLAG | - | |
| CMAKE_<LANG>_LINKER_LAUNCHER | - | |
| CMAKE_<LANG>_USING_LINKER_<TYPE> | - | |
| CMAKE_<LANG>_VISIBILITY_PRESET | - | |
| CMAKE_LIBRARY_OUTPUT_DIRECTORY | - | |
| CMAKE_LIBRARY_OUTPUT_DIRECTORY_<CONFIG> | - | |
| CMAKE_LIBRARY_PATH_FLAG | - | |
| CMAKE_LINK_DEF_FILE_FLAG | - | |
| CMAKE_LINK_DEPENDS_NO_SHARED | - | |
| CMAKE_LINK_DEPENDS_USE_LINKER | - | |
| CMAKE_LINK_GROUP_USING_<FEATURE> | - | |
| CMAKE_LINK_GROUP_USING_<FEATURE>_SUPPORTED | - | |
| CMAKE_LINK_INTERFACE_LIBRARIES | - | |
| CMAKE_LINK_LIBRARIES_STRATEGY | - | |
| CMAKE_LINK_LIBRARY_<FEATURE>_ATTRIBUTES | - | |
| CMAKE_LINK_LIBRARY_FILE_FLAG | - | |
| CMAKE_LINK_LIBRARY_FLAG | - | |
| CMAKE_LINK_LIBRARY_USING_<FEATURE> | - | |
| CMAKE_LINK_LIBRARY_USING_<FEATURE>_SUPPORTED | - | |
| CMAKE_LINK_WARNING_AS_ERROR | - | |
| CMAKE_LINK_WHAT_YOU_USE | - | |
| CMAKE_LINK_WHAT_YOU_USE_CHECK | - | |
| CMAKE_LINKER_TYPE | - | |
| CMAKE_MACOSX_BUNDLE | - | |
| CMAKE_MACOSX_RPATH | - | |
| CMAKE_MAP_IMPORTED_CONFIG_<CONFIG> | - | |
| CMAKE_MODULE_LINKER_FLAGS | - | |
| CMAKE_MODULE_LINKER_FLAGS_<CONFIG> | - | |
| CMAKE_MODULE_LINKER_FLAGS_<CONFIG>_INIT | - | |
| CMAKE_MODULE_LINKER_FLAGS_INIT | - | |
| CMAKE_MSVC_DEBUG_INFORMATION_FORMAT | - | |
| CMAKE_MSVC_RUNTIME_CHECKS | - | |
| CMAKE_MSVC_RUNTIME_LIBRARY | - | |
| CMAKE_MSVCIDE_RUN_PATH | - | |
| CMAKE_NINJA_OUTPUT_PATH_PREFIX | - | |
| CMAKE_NO_BUILTIN_CHRPATH | - | |
| CMAKE_NO_SYSTEM_FROM_IMPORTED | - | |
| CMAKE_OPTIMIZE_DEPENDENCIES | - | |
| CMAKE_OSX_ARCHITECTURES | - | |
| CMAKE_OSX_DEPLOYMENT_TARGET | - | |
| CMAKE_OSX_SYSROOT | - | |
| CMAKE_PCH_INSTANTIATE_TEMPLATES | - | |
| CMAKE_PCH_WARN_INVALID | - | |
| CMAKE_PDB_OUTPUT_DIRECTORY | - | |
| CMAKE_PDB_OUTPUT_DIRECTORY_<CONFIG> | - | |
| CMAKE_PLATFORM_NO_VERSIONED_SONAME | - | |
| CMAKE_POSITION_INDEPENDENT_CODE | - | |
| CMAKE_RUNTIME_OUTPUT_DIRECTORY | - | |
| CMAKE_RUNTIME_OUTPUT_DIRECTORY_<CONFIG> | - | |
| CMAKE_SHARED_LIBRARY_ENABLE_EXPORTS | - | |
| CMAKE_SHARED_LINKER_FLAGS | - | |
| CMAKE_SHARED_LINKER_FLAGS_<CONFIG> | - | |
| CMAKE_SHARED_LINKER_FLAGS_<CONFIG>_INIT | - | |
| CMAKE_SHARED_LINKER_FLAGS_INIT | - | |
| CMAKE_SKIP_BUILD_RPATH | - | |
| CMAKE_SKIP_INSTALL_RPATH | - | |
| CMAKE_SKIP_LINTING | - | |
| CMAKE_STATIC_LINKER_FLAGS | - | |
| CMAKE_STATIC_LINKER_FLAGS_<CONFIG> | - | |
| CMAKE_STATIC_LINKER_FLAGS_<CONFIG>_INIT | - | |
| CMAKE_STATIC_LINKER_FLAGS_INIT | - | |
| CMAKE_TASKING_TOOLSET | - | |
| CMAKE_TRY_COMPILE_CONFIGURATION | - | |
| CMAKE_TRY_COMPILE_NO_PLATFORM_VARIABLES | - | |
| CMAKE_TRY_COMPILE_PLATFORM_VARIABLES | - | |
| CMAKE_TRY_COMPILE_TARGET_TYPE | - | |
| CMAKE_UNITY_BUILD | - | |
| CMAKE_UNITY_BUILD_BATCH_SIZE | - | |
| CMAKE_UNITY_BUILD_RELOCATABLE | - | |
| CMAKE_UNITY_BUILD_UNIQUE_ID | - | |
| CMAKE_VERIFY_INTERFACE_HEADER_SETS | - | |
| CMAKE_VISIBILITY_INLINES_HIDDEN | - | |
| CMAKE_VS_DEBUGGER_COMMAND | - | |
| CMAKE_VS_DEBUGGER_COMMAND_ARGUMENTS | - | |
| CMAKE_VS_DEBUGGER_ENVIRONMENT | - | |
| CMAKE_VS_DEBUGGER_WORKING_DIRECTORY | - | |
| CMAKE_VS_GLOBALS | - | |
| CMAKE_VS_INCLUDE_INSTALL_TO_DEFAULT_BUILD | - | |
| CMAKE_VS_INCLUDE_PACKAGE_TO_DEFAULT_BUILD | - | |
| CMAKE_VS_JUST_MY_CODE_DEBUGGING | - | |
| CMAKE_VS_NO_COMPILE_BATCHING | - | |
| CMAKE_VS_SDK_EXCLUDE_DIRECTORIES | - | |
| CMAKE_VS_SDK_EXECUTABLE_DIRECTORIES | - | |
| CMAKE_VS_SDK_INCLUDE_DIRECTORIES | - | |
| CMAKE_VS_SDK_LIBRARY_DIRECTORIES | - | |
| CMAKE_VS_SDK_LIBRARY_WINRT_DIRECTORIES | - | |
| CMAKE_VS_SDK_REFERENCE_DIRECTORIES | - | |
| CMAKE_VS_SDK_SOURCE_DIRECTORIES | - | |
| CMAKE_VS_WINRT_BY_DEFAULT | - | |
| CMAKE_WATCOM_RUNTIME_LIBRARY | - | |
| CMAKE_WIN32_EXECUTABLE | - | |
| CMAKE_WINDOWS_EXPORT_ALL_SYMBOLS | - | |
| CMAKE_XCODE_ATTRIBUTE_<an-attribute> | - | |
| EXECUTABLE_OUTPUT_PATH | - | |
| LIBRARY_OUTPUT_PATH | - | |

### Languages

| Command | Supported | Remarks |
| - | - | - |
| CMAKE_C_COMPILE_FEATURES | - | |
| CMAKE_C_EXTENSIONS | - | |
| CMAKE_C_STANDARD | - | |
| CMAKE_C_STANDARD_REQUIRED | - | |
| CMAKE_CUDA_ARCHITECTURES | - | |
| CMAKE_CUDA_COMPILE_FEATURES | - | |
| CMAKE_CUDA_EXTENSIONS | - | |
| CMAKE_CUDA_HOST_COMPILER | - | |
| CMAKE_CUDA_STANDARD | - | |
| CMAKE_CUDA_STANDARD_REQUIRED | - | |
| CMAKE_CUDA_TOOLKIT_INCLUDE_DIRECTORIES | - | |
| CMAKE_CXX_COMPILE_FEATURES | - | |
| CMAKE_CXX_COMPILER_IMPORT_STD | - | |
| CMAKE_CXX_EXTENSIONS | - | |
| CMAKE_CXX_STANDARD | - | |
| CMAKE_CXX_STANDARD_REQUIRED | - | |
| CMAKE_Fortran_MODDIR_DEFAULT | - | |
| CMAKE_Fortran_MODDIR_FLAG | - | |
| CMAKE_Fortran_MODOUT_FLAG | - | |
| CMAKE_HIP_ARCHITECTURES | - | |
| CMAKE_HIP_COMPILE_FEATURES | - | |
| CMAKE_HIP_EXTENSIONS | - | |
| CMAKE_HIP_PLATFORM | - | |
| CMAKE_HIP_STANDARD | - | |
| CMAKE_HIP_STANDARD_REQUIRED | - | |
| CMAKE_ISPC_HEADER_DIRECTORY | - | |
| CMAKE_ISPC_HEADER_SUFFIX | - | |
| CMAKE_ISPC_INSTRUCTION_SETS | - | |
| CMAKE_<LANG>_ANDROID_TOOLCHAIN_MACHINE | - | |
| CMAKE_<LANG>_ANDROID_TOOLCHAIN_PREFIX | - | |
| CMAKE_<LANG>_ANDROID_TOOLCHAIN_SUFFIX | - | |
| CMAKE_<LANG>_ARCHIVE_APPEND | - | |
| CMAKE_<LANG>_ARCHIVE_CREATE | - | |
| CMAKE_<LANG>_ARCHIVE_FINISH | - | |
| CMAKE_<LANG>_ARCHIVER_WRAPPER_FLAG | - | |
| CMAKE_<LANG>_ARCHIVER_WRAPPER_FLAG_SEP | - | |
| CMAKE_<LANG>_BYTE_ORDER | - | |
| CMAKE_<LANG>_COMPILE_OBJECT | - | |
| CMAKE_<LANG>_COMPILER | - | |
| CMAKE_<LANG>_COMPILER_EXTERNAL_TOOLCHAIN | - | |
| CMAKE_<LANG>_COMPILER_ID | - | |
| CMAKE_<LANG>_COMPILER_LOADED | - | |
| CMAKE_<LANG>_COMPILER_PREDEFINES_COMMAND | - | |
| CMAKE_<LANG>_COMPILER_TARGET | - | |
| CMAKE_<LANG>_COMPILER_VERSION | - | |
| CMAKE_<LANG>_CREATE_SHARED_LIBRARY | - | |
| CMAKE_<LANG>_CREATE_SHARED_LIBRARY_ARCHIVE | - | |
| CMAKE_<LANG>_CREATE_SHARED_MODULE | - | |
| CMAKE_<LANG>_CREATE_STATIC_LIBRARY | - | |
| CMAKE_<LANG>_EXTENSIONS | - | |
| CMAKE_<LANG>_EXTENSIONS_DEFAULT | - | |
| CMAKE_<LANG>_FLAGS | - | |
| CMAKE_<LANG>_FLAGS_<CONFIG> | - | |
| CMAKE_<LANG>_FLAGS_<CONFIG>_INIT | - | |
| CMAKE_<LANG>_FLAGS_DEBUG | - | |
| CMAKE_<LANG>_FLAGS_DEBUG_INIT | - | |
| CMAKE_<LANG>_FLAGS_INIT | - | |
| CMAKE_<LANG>_FLAGS_MINSIZEREL | - | |
| CMAKE_<LANG>_FLAGS_MINSIZEREL_INIT | - | |
| CMAKE_<LANG>_FLAGS_RELEASE | - | |
| CMAKE_<LANG>_FLAGS_RELEASE_INIT | - | |
| CMAKE_<LANG>_FLAGS_RELWITHDEBINFO | - | |
| CMAKE_<LANG>_FLAGS_RELWITHDEBINFO_INIT | - | |
| CMAKE_<LANG>_HOST_COMPILER | - | |
| CMAKE_<LANG>_HOST_COMPILER_ID | - | |
| CMAKE_<LANG>_HOST_COMPILER_VERSION | - | |
| CMAKE_<LANG>_IGNORE_EXTENSIONS | - | |
| CMAKE_<LANG>_IMPLICIT_INCLUDE_DIRECTORIES | - | |
| CMAKE_<LANG>_IMPLICIT_LINK_DIRECTORIES | - | |
| CMAKE_<LANG>_IMPLICIT_LINK_FRAMEWORK_DIRECTORIES | - | |
| CMAKE_<LANG>_IMPLICIT_LINK_LIBRARIES | - | |
| CMAKE_<LANG>_LIBRARY_ARCHITECTURE | - | |
| CMAKE_<LANG>_LINK_EXECUTABLE | - | |
| CMAKE_<LANG>_LINKER_WRAPPER_FLAG | - | |
| CMAKE_<LANG>_LINKER_WRAPPER_FLAG_SEP | - | |
| CMAKE_<LANG>_OUTPUT_EXTENSION | - | |
| CMAKE_<LANG>_SIMULATE_ID | - | |
| CMAKE_<LANG>_SIMULATE_VERSION | - | |
| CMAKE_<LANG>_SIZEOF_DATA_PTR | - | |
| CMAKE_<LANG>_SOURCE_FILE_EXTENSIONS | - | |
| CMAKE_<LANG>_STANDARD | - | |
| CMAKE_<LANG>_STANDARD_DEFAULT | - | |
| CMAKE_<LANG>_STANDARD_INCLUDE_DIRECTORIES | - | |
| CMAKE_<LANG>_STANDARD_LATEST | - | |
| CMAKE_<LANG>_STANDARD_LIBRARIES | - | |
| CMAKE_<LANG>_STANDARD_LINK_DIRECTORIES | - | |
| CMAKE_<LANG>_STANDARD_REQUIRED | - | |
| CMAKE_OBJC_EXTENSIONS | - | |
| CMAKE_OBJC_STANDARD | - | |
| CMAKE_OBJC_STANDARD_REQUIRED | - | |
| CMAKE_OBJCXX_EXTENSIONS | - | |
| CMAKE_OBJCXX_STANDARD | - | |
| CMAKE_OBJCXX_STANDARD_REQUIRED | - | |
| CMAKE_Swift_LANGUAGE_VERSION | - | |
| CMAKE_USER_MAKE_RULES_OVERRIDE_<LANG> | - | |

### CTest

| Command | Supported | Remarks |
| - | - | - |
| CTEST_BINARY_DIRECTORY | - | |
| CTEST_BUILD_COMMAND | - | |
| CTEST_BUILD_NAME | - | |
| CTEST_BZR_COMMAND | - | |
| CTEST_BZR_UPDATE_OPTIONS | - | |
| CTEST_CHANGE_ID | - | |
| CTEST_CHECKOUT_COMMAND | - | |
| CTEST_CONFIGURATION_TYPE | - | |
| CTEST_CONFIGURE_COMMAND | - | |
| CTEST_COVERAGE_COMMAND | - | |
| CTEST_COVERAGE_EXTRA_FLAGS | - | |
| CTEST_CUSTOM_COVERAGE_EXCLUDE | - | |
| CTEST_CUSTOM_ERROR_EXCEPTION | - | |
| CTEST_CUSTOM_ERROR_MATCH | - | |
| CTEST_CUSTOM_ERROR_POST_CONTEXT | - | |
| CTEST_CUSTOM_ERROR_PRE_CONTEXT | - | |
| CTEST_CUSTOM_MAXIMUM_FAILED_TEST_OUTPUT_SIZE | - | |
| CTEST_CUSTOM_MAXIMUM_NUMBER_OF_ERRORS | - | |
| CTEST_CUSTOM_MAXIMUM_NUMBER_OF_WARNINGS | - | |
| CTEST_CUSTOM_MAXIMUM_PASSED_TEST_OUTPUT_SIZE | - | |
| CTEST_CUSTOM_MEMCHECK_IGNORE | - | |
| CTEST_CUSTOM_POST_MEMCHECK | - | |
| CTEST_CUSTOM_POST_TEST | - | |
| CTEST_CUSTOM_PRE_MEMCHECK | - | |
| CTEST_CUSTOM_PRE_TEST | - | |
| CTEST_CUSTOM_TEST_OUTPUT_TRUNCATION | - | |
| CTEST_CUSTOM_TESTS_IGNORE | - | |
| CTEST_CUSTOM_WARNING_EXCEPTION | - | |
| CTEST_CUSTOM_WARNING_MATCH | - | |
| CTEST_CVS_COMMAND | - | |
| CTEST_CVS_UPDATE_OPTIONS | - | |
| CTEST_DROP_LOCATION | - | |
| CTEST_DROP_METHOD | - | |
| CTEST_DROP_SITE | - | |
| CTEST_DROP_SITE_CDASH | - | |
| CTEST_DROP_SITE_PASSWORD | - | |
| CTEST_DROP_SITE_USER | - | |
| CTEST_EXTRA_COVERAGE_GLOB | - | |
| CTEST_EXTRA_SUBMIT_FILES | - | |
| CTEST_GIT_COMMAND | - | |
| CTEST_GIT_INIT_SUBMODULES | - | |
| CTEST_GIT_UPDATE_CUSTOM | - | |
| CTEST_GIT_UPDATE_OPTIONS | - | |
| CTEST_HG_COMMAND | - | |
| CTEST_HG_UPDATE_OPTIONS | - | |
| CTEST_LABELS_FOR_SUBPROJECTS | - | |
| CTEST_MEMORYCHECK_COMMAND | - | |
| CTEST_MEMORYCHECK_COMMAND_OPTIONS | - | |
| CTEST_MEMORYCHECK_SANITIZER_OPTIONS | - | |
| CTEST_MEMORYCHECK_SUPPRESSIONS_FILE | - | |
| CTEST_MEMORYCHECK_TYPE | - | |
| CTEST_NIGHTLY_START_TIME | - | |
| CTEST_NOTES_FILES | - | |
| CTEST_P4_CLIENT | - | |
| CTEST_P4_COMMAND | - | |
| CTEST_P4_OPTIONS | - | |
| CTEST_P4_UPDATE_OPTIONS | - | |
| CTEST_RESOURCE_SPEC_FILE | - | |
| CTEST_RUN_CURRENT_SCRIPT | - | |
| CTEST_SCRIPT_DIRECTORY | - | |
| CTEST_SITE | - | |
| CTEST_SOURCE_DIRECTORY | - | |
| CTEST_SUBMIT_INACTIVITY_TIMEOUT | - | |
| CTEST_SUBMIT_URL | - | |
| CTEST_SVN_COMMAND | - | |
| CTEST_SVN_OPTIONS | - | |
| CTEST_SVN_UPDATE_OPTIONS | - | |
| CTEST_TEST_LOAD | - | |
| CTEST_TEST_TIMEOUT | - | |
| CTEST_TLS_VERIFY | - | |
| CTEST_TLS_VERSION | - | |
| CTEST_UPDATE_COMMAND | - | |
| CTEST_UPDATE_OPTIONS | - | |
| CTEST_UPDATE_VERSION_ONLY | - | |
| CTEST_UPDATE_VERSION_OVERRIDE | - | |
| CTEST_USE_LAUNCHERS | - | |

### CPack

| Command | Supported | Remarks |
| - | - | - |
| CPACK_ABSOLUTE_DESTINATION_FILES | - | |
| CPACK_COMPONENT_INCLUDE_TOPLEVEL_DIRECTORY | - | |
| CPACK_CUSTOM_INSTALL_VARIABLES | - | |
| CPACK_ERROR_ON_ABSOLUTE_INSTALL_DESTINATION | - | |
| CPACK_INCLUDE_TOPLEVEL_DIRECTORY | - | |
| CPACK_INSTALL_DEFAULT_DIRECTORY_PERMISSIONS | - | |
| CPACK_PACKAGING_INSTALL_PREFIX | - | |
| CPACK_SET_DESTDIR | - | |
| CPACK_WARN_ON_ABSOLUTE_INSTALL_DESTINATION | - | |

### Expansion Operators

| Command | Supported | Remarks |
| - | - | - |
| CACHE | - | |
| ENV | - | |

### Internal

| Command | Supported | Remarks |
| - | - | - |
| CMAKE_HOME_DIRECTORY | - | |
| CMAKE_INTERNAL_PLATFORM_ABI | - | |
| CMAKE_<LANG>_COMPILER_ABI | - | |
| CMAKE_<LANG>_COMPILER_VERSION_INTERNAL | - | |
| CMAKE_<LANG>_LINKER_PREFERENCE | - | |
| CMAKE_<LANG>_LINKER_PREFERENCE_PROPAGATES | - | |
| CMAKE_<LANG>_PLATFORM_ID | - | |
| CMAKE_NOT_USING_CONFIG_FLAGS | - | |
| CMAKE_VS_INTEL_Fortran_PROJECT_VERSION | - | |

### Deprecated Provide Information

| Command | Supported | Remarks |
| - | - | - |
| CMAKE_CFG_INTDIR | - | |
| CMAKE_EXTRA_GENERATOR | - | |

### Deprecated Change Behavior

| Command | Supported | Remarks |
| - | - | - |
| CMAKE_AUTOMOC_RELAXED_MODE | - | |
| CMAKE_BACKWARDS_COMPATIBILITY | - | |
| CMAKE_FIND_PACKAGE_NO_PACKAGE_REGISTRY | - | |
| CMAKE_FIND_PACKAGE_NO_SYSTEM_PACKAGE_REGISTRY | - | |

### Deprecated Describe the System

| Command | Supported | Remarks |
| - | - | - |
| MSVC10 | - | |
| MSVC11 | - | |
| MSVC12 | - | |
| MSVC14 | - | |
| MSVC60 | - | |
| MSVC70 | - | |
| MSVC71 | - | |
| MSVC80 | - | |
| MSVC90 | - | |

### Deprecated Control the Build

| Command | Supported | Remarks |
| - | - | - |
| CMAKE_IOS_INSTALL_COMBINED | - | |
| CMAKE_<LANG>_USING_LINKER_MODE | - | |
| CMAKE_USE_RELATIVE_PATHS | - | |

### Deprecated Languages

| Command | Supported | Remarks |
| - | - | - |
| CMAKE_COMPILER_IS_GNUCC | - | |
| CMAKE_COMPILER_IS_GNUCXX | - | |
| CMAKE_COMPILER_IS_GNUG77 | - | |

### Deprecated CTest

| Command | Supported | Remarks |
| - | - | - |
| CTEST_CURL_OPTIONS | - | |
| CTEST_CVS_CHECKOUT | - | |
| CTEST_SCP_COMMAND | - | |
| CTEST_TRIGGER_SITE | - | |
