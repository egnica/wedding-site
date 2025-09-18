"use client";

import { AddToCalendarButton } from "add-to-calendar-button-react";

export default function Button() {
  return (
    <AddToCalendarButton
      name="Martin and Egner Wedding"
      options={[
        "Apple",
        "Google",
        "MicrosoftTeams",
        "Outlook.com",
        "Microsoft365",
      ]}
      location="Lumber Exchange Event Center"
      address="10 S 5th St, Minneapolis, MN 55402"
      startDate="2026-06-05"
      startTime="16:00"
      endTime="23:00"
      timeZone="America/Chicago"
      description="Leslie & Brian can’t wait to celebrate with you!"
      lightMode="light"
    ></AddToCalendarButton>
  );
}
