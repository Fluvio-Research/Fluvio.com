# Fluvio website source collection — 14 November 2026

## Requested information architecture

- Products: FS-Spot, FS-Halo, FS-Flux (physical hardware).
- Systems: FlowSense, FloodSense, NodeSense (monitoring applications within FluvioSense).
- Public Cascade branding becomes FluvioPulse. The existing data.fluvio.com.au destination is retained; no new Pulse URL was supplied.
- SIWIS remains on Projects and in the WRD project; removed from the homepage platform lineup and hero/operational preview images.

## Collected originals

| Source                                                                                                  | Material                                                                                                                   | Website use                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Fluvio LinkedIn post](https://www.linkedin.com/feed/update/urn:li:activity:7521391511112953856/)       | Exact 10-second composite FloodSense video, downloaded from the public post's video player                                 | `floodsense-linkedin.mp4`, homepage demonstration, Systems demonstration, flood-camera case study                                                                              |
| Simon's OneDrive / Fluvio Projects / FluvioSense / FluvioSense overview.pptx, modified 10 November 2026 | 19-slide deck; 57 images and nine embedded video files                                                                     | Spot photo (slide 8, image30.png), Halo photo (slide 8, image31.png), Halo deployment photograph (slide 11, image37.jpeg), Panorama segmentation still (slide 13, image51.png) |
| OneDrive recent file: FloodSense Albert St Goodna Nov 13_14.mp4                                         | 18 MB recent flood video, downloaded to Downloads                                                                          | Collected for follow-up; not substituted for the exact LinkedIn clip                                                                                                           |
| [Fluvio company posts](https://www.linkedin.com/company/fluvioptyltd/posts/)                            | FS-Flux introduction; Spot/Halo launch at AHA; Bina fieldwork; CoaSTED/Global Pollution Watch; FS-Nomad Moreton Bay survey | Product descriptions and verification of existing project coverage                                                                                                             |
| [Current expertise page](https://fluvio.com.au/expertise)                                               | Nine staff profiles and nine capabilities                                                                                  | Compared with existing nine staff and six broader capability groups; existing site already covers most material                                                                |

The full overview deck remains in the user's Downloads folder. It contains high-resolution deployments, dashboards, original footage and the Spot/Halo specifications on slide 17. Extracted files in `/tmp/fluvio-source-material` are reproducible from that deck. Large originals are intentionally excluded from the public git repository.

## Accuracy and media notes

- FS-Spot: compact optical gauging; slide 17 states 0.5 kg, surface velocity/discharge, cellular/Ethernet and satellite option.
- FS-Halo: 32× zoom, automatic water detection and up to 500 m range, supported by slides 8, 9 and 17. Field conditions affect suitability; no accuracy guarantees added.
- FS-Flux: floating methane chamber supported by LinkedIn introduction. Its website image is explicitly a field application photograph of methane chambers, not asserted to be an FS-Flux product photograph.
- NodeSense wording stays within the existing FluvioSense material: water-quality nodes, site management, telemetry and export. No unsupported specifications added.
- FloodSense case study is described as a demonstration, not a commissioned council deployment or a proven safety outcome.
- The LinkedIn clip retains its original picture and timing; the audio track was removed for lightweight demonstration use. Poster extracted from the clip at two seconds.
- The new FloodSense players use `preload="none"`, visible controls and no automatic playback. Full composite remains visible without cropping its dashboard.
- Local images use Astro's responsive optimization. New page copy is supplied in English, Pijin, French and Spanish; Pijin should receive the team's normal editorial review.
- OneDrive's other requested downloads (brochure and hardware deck) were not verified locally. Do not treat those files as collected.

## Expertise comparison

The existing site's six capability groups already encompass the older page's hydrological monitoring, island modelling, catchment management, blue carbon, operational monitoring and sediment loading. Methane is covered by the greenhouse-gas project and the new FS-Flux product. Autonomous water monitoring and sea-level-rise wording remain useful candidates for future dedicated case studies; no unverified project outcomes were added.

## Validation and environment

The implementation is in an isolated checkout because the original website folder is outside this chat’s writable project. Original working files were preserved. The new site builds without network font requests by bundling the same existing WOFF2 faces. Browser layout verification remains blocked because the local preview server cannot start under this session’s restrictions.
