# Divergent World Product Platform Intent

This document preserves the intended direction of Divergent.World without
turning future ideas into premature implementation commitments.

## Institutional purpose

Divergent World is one enduring institution whose companies reinforce one
another. Technology creates capability, media creates culture, design creates
experience, ventures allocates capital, and properties creates permanence. The
shared mission is to increase human potential.

The public website should make that institutional structure legible while
remaining an inviting gateway rather than an internal cockpit.

## Product direction

Divergent.World is intended to grow from a public gateway into a membership
platform and trusted network for founders, builders, creators, entrepreneurs,
and lifelong learners.

Members will have a Divergent World ID: a durable identity with a profile that
can participate across the institution. The identity is conceptually distinct
from a login credential or billing record so authentication and payment
providers can evolve without redefining the member.

The planned product capabilities are:

- free, professional, and premium membership levels;
- profiles and a searchable directory of founders and other members;
- an inbox and member-to-member communication;
- newsletters, courses, tools, and shared infrastructure;
- public routes for Divergent Systems, Divergent Media, Divergent Design, and
  the central Divergent World thesis;
- account, authentication, billing, privacy, and membership-management flows.

## Delivery sequence

### 1. Public gateway

Keep the homepage visual-first and public. Establish the shared visual tokens,
navigation model, footer, branch language, and route conventions that later
surfaces can reuse.

### 2. Public knowledge layer

Publish the thesis and dedicated branch routes. These remain readable without
an account and deepen the story introduced by the homepage.

### 3. Divergent World ID

Add authentication, profiles, handles, and account recovery. A member should
have one stable internal identity even if their email, login method, public
handle, or membership level changes.

### 4. Membership and access

Add billing and entitlements for free, professional, and premium offerings.
Membership grants access to products; it does not own the member identity.

### 5. Network and communication

Add directory discovery, privacy controls, inboxes, and communication only
after identity and moderation boundaries are established.

## Technical boundaries

- Preserve the hybrid architecture: server-rendered, accessible HTML around
  isolated client-side interactive experiences.
- Keep public institutional content independent from authenticated member data.
- Centralize durable domain language and public destinations, not page-specific
  presentation details.
- Select the database, authentication, billing, and messaging providers when
  those product slices are designed. Supabase is a candidate, not a current
  commitment.
- Treat member profiles, private messages, billing data, and authentication
  secrets as separate data classes with explicit access policies.
- Add routes only when they contain a real, useful surface. Do not publish empty
  placeholders.

## Navigation contract

The primary header stays intentionally sparse. The footer can hold the broader
public map, policy links, social links, contact, and work-with-us destinations
as they become real. Authentication controls should become a distinct account
affordance rather than being mixed into the institutional navigation.

The immersive homepage, public content routes, and authenticated application
should share typography, color, motion restraint, borderless surfaces, and the
deep-space visual language while retaining separate interaction needs.

## Current scope

The current homepage establishes the gateway, shared palette, public navigation
data, and footer. It does not create database schemas, authentication, billing,
memberships, profiles, directories, inboxes, or placeholder routes.
