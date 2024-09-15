"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Star, MessageSquare, MapPin } from 'lucide-react';
import { iProduct } from "@/app/util/Interfaces";

const ClaimProductComponent = ({ product }: { product: iProduct }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const router = useRouter();

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);


  const handleClaimproduct = async (product: any) => {
    setIsClaiming(true);
    try {
      const response = await fetch('/api/update/claim-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: product }),
      });

      if (!response.ok) {
        throw new Error('Failed to claim product');
      }

      const result = await response.json();

      console.log("product Claimed Successfully!"),

        // Redirect to the product update page
        router.push(`/mybusinesses/`);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsClaiming(false);
      handleCloseDialog();
    }
  };

  return (
    <>
      <Button className="bg-white hover:bg-grat-100" onClick={handleOpenDialog}>Claim This product</Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Claim Your product</DialogTitle>
            <DialogDescription>
              You&apos;re about to claim ownership of this product. Please review the information below to ensure it&apos;s correct.
            </DialogDescription>
          </DialogHeader>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {product.address}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
                  <span className="font-medium mr-2">{product.rating}</span>
                  <span className="text-sm text-gray-500">
                    ({product.reviews?.length} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    Recent review: &quot;Some review title here&quot;
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={() => handleClaimproduct(product)} disabled={isClaiming}>
              {isClaiming ? 'Claiming...' : 'Confirm Claim'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClaimProductComponent;
